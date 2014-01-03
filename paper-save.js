var config = require('./config'),
    fs = require('fs'),
    path = require('path');

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
                fs.writeFile(dir + imageName, data, function (err) {
                    if (err) throw err;
                });

                fs.writeFile(dir + 'index.md', txt, function (err) {
                    if (err) throw err;
                });
            });
        });
    };
}