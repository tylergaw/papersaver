#!/usr/bin/env node
try {
    var argv = require('optimist')
        .usage('Creates a new Paper entry from -i, --image.\nUsage: $0')
        .demand('i')
        .alias('i', 'image')
        .describe('i', 'The image from Paper')
        .argv;
}
catch (e) {
    throw new Error('Papersaver cli requires the package "optimist". To install: npm install optimist');
}

var savePaper = require('./papersaver').save;
savePaper(argv.image);