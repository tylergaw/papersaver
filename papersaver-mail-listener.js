try {
    var mailSettings = require('./mail-settings.json');
}
catch (e) {
    console.log("You need to create the file 'mail-settings.json' based on 'mail-settings.sample.json'.");
    return false;
}

var fs = require('fs'),
    MailListener = require('mail-listener2'),
    Papersaver = require('./papersaver'),
    paperSaver = new Papersaver();

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

            paperSaver.save(file, function () {
                fs.unlink(file);
            });
        });
    }
});