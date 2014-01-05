var config = require('./config.json'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    metaDataTmpl = './templates/paper-metadata.txt',
    papersDir = './contents/';

module.exports = Papersaver();

// Use mustache-style syntax
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

function Papersaver () {
    this.save = function (img, callback) {
        if (!img) {
            return new Error('This function requires at least 1 argument, "img". The path to the image you want to save.');
        }

        fs.readFile(img, function (err, data) {
            if (err) throw err;

            if (typeof callback == 'function') {
                callback();
            }

            var ext = path.extname(img),
                d = new Date(),
                timestamp = d.getTime(),
                imageName = config.imgSlug + '-paper-' + timestamp + ext,
                dir = papersDir + timestamp + '/';

            fs.mkdir(dir, function () {
                fs.writeFileSync(dir + imageName, data);

                fs.readFile(metaDataTmpl, 'utf8', function (err, tmplStr) {
                    var metaData = _.template(tmplStr, {
                        'date': timestamp,
                        'imagePath': imageName
                    });

                    fs.writeFileSync(dir + 'index.md', metaData);

                    buildStatic();

                    if (parseInt(process.env['gitUpdateOnSave'], 10)) {
                        updateGitRepo();
                    }
                });
            });
        });
    };

    return this;
}

// Build the site using Wintersmith. This can happen before or after git update
// because we gitignore the built site.
function buildStatic () {
    exec('wintersmith build -X', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

// Add the new papers to the repo and then push the changes.
function updateGitRepo () {
    var cmd = 'git add ' + papersDir + '&& git commit -m "Adding papers" && git push';

    exec(cmd, function (error, stdout, stderr) {
        console.log(stdout);
    });
}