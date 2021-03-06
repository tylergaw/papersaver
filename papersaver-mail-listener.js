#!/usr/bin/env node
try {
    var argv = require('optimist')
        .usage('Listens for new emails in mail-settings.json.\nUsage: $0')
        .alias('g', 'git')
        .describe('g', 'Add new files, commit, and push to Git repo when saving a new Paper.')
        .default('g', true)
        .boolean('g')
        .argv;
}
catch (e) {
    throw new Error('Papersaver cli requires the package "optimist". To install: npm install optimist');
}

process.env['gitUpdateOnSave'] = (argv.git) ? 1 : 0;

// This needs to be left running to work properly.
// There are a lot of different ways to do that. I'm using Forever inside of
// Screen. Not sure if Forever is quite necessary, but it's working. You could
// just node script.js in a screen and it would likely be fine.

try {
    var mailSettings = require('./mail-settings.json');
}
catch (e) {
    throw new Error("You need to create the file 'mail-settings.json' based on 'mail-settings.sample.json'.");
}

var fs = require('fs'),
    MailListener = require('mail-listener2'),
    savePaper = require('./papersaver').save,
    _ = require('underscore');

var mailListener = new MailListener({
    username: mailSettings.username,
    password: mailSettings.password,
    host: mailSettings.host,
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
    },
    mailbox: 'INBOX',
    markSeen: true
});

mailListener.start();

mailListener.on('server:connected', function () {
    console.log('Connected to IMAP server, listening for mail.');
});

mailListener.on('error', function (err) {
    console.log(err);
});

mailListener.on('mail', function (mail) {
    console.log('Mail received');

    if (mailSettings.fromWhitelist) {
        var allowedFrom = (_.indexOf(mailSettings.fromWhitelist, mail.from[0].address) > -1);

        if (!allowedFrom) {
            console.log('Mail was sent from an address that is not in your from whitelist. Aborting');
            return false;
        }
    }

    if (mailSettings.toWhitelist) {
        var allowedTo = (_.indexOf(mailSettings.toWhitelist, mail.to[0].address) > -1);

        if (!allowedTo) {
            console.log('Mail was sent to an address that is not in your to whitelist. Aborting');
            return false;
        }
    }

    var att = mail.attachments || [];
    if (att.length) {
        var file = att[0].fileName;

        fs.writeFile(file, att[0].content, function (err) {
            if (err) throw err;

            savePaper(file, function () {
                fs.unlink(file);
            });
        });
    }
    else {
        console.log('No attachment. Aborting.');
        return false;
    }
});