var config = require('./config.json'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec;

module.exports = Papersaver;

function Papersaver () {
    this.save = function (img, callback) {
        fs.readFile(img, function (err, data) {
            if (err) throw err;

            if (typeof callback == 'function') {
                callback();
            }

            var ext = path.extname(img),
                d = new Date(),
                timestamp = d.getTime(),
                // TODO: I don't think the hard-coded name here is good.
                imageName = config.imgSlug + '-paper-' + timestamp + ext,
                dir = './contents/papers/' + timestamp + '/';

            // TODO: Again this string manipulation feels wrong. Too brittle.
            var txt = config.metaDataTmpl.replace('$stamp', timestamp)
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
    exec('wintersmith build -X', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}