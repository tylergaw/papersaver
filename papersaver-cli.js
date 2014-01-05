#!/usr/bin/env node
try {
    var argv = require('optimist')
        .usage('Creates a new Paper entry from -i, --image.\nUsage: $0')
        .demand('i')
        .alias('i', 'image')
        .describe('i', 'The image from Paper')
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

var savePaper = require('./papersaver').save;
savePaper(argv.image);