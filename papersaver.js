var config = require('./config'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

module.exports = Papersaver;

function Papersaver () {
    this.save = function (img) {
        fs.readFile(img, function (err, data) {
            if (err) throw err;

            var ext = path.extname(img),
                d = new Date(),
                timestamp = d.getTime(),
                // TODO: I don't think the hard-coded name here is good.
                imageName = config.slug + '-paper-' + timestamp + ext,
                dir = config.papersSlug + timestamp + '/';

            // TODO: Again this string manipulation feels wrong. Too brittle.
            var txt = config.fms.replace('$stamp', timestamp)
                .replace('$name', imageName);

            fs.mkdir(dir, function () {
                fs.writeFileSync(dir + imageName, data);
                fs.writeFileSync(dir + 'index.md', txt);
                buildStatic();
            });
        });
    };
}

function buildStatic () {
    exec('grunt wintersmith:production', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}