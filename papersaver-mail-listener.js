// This needs to be left running to work properly.
// There are a lot of different ways to do that. I'm using Forever inside of
// Screen. Not sure if Forever is quite necessary, but it's working. You could
// just node script.js in a screen and it would likely be fine.

try {
    var mailSettings = require('./mail-settings.json');
}
catch (e) {
    return new Error("You need to create the file 'mail-settings.json' based on 'mail-settings.sample.json'.");
}

var fs = require('fs'),
    MailListener = require('mail-listener2'),
    savePaper = require('./papersaver').save;

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

    var att = mail.attachments;

    if (att.length) {
        var file = att[0].fileName;

        fs.writeFile(file, att[0].content, function (err) {
            if (err) throw err;

            savePaper(file, function () {
                fs.unlink(file);
            });
        });
    }
});