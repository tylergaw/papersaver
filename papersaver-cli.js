#!/usr/bin/env node
var argv = require('optimist')
    .usage('Creates a new Paper entry from -i, --image.\nUsage: $0')
    .demand('i')
    .alias('i', 'image')
    .describe('i', 'The image from Paper')
    .argv;

var savePaper = require('./papersaver').save;
savePaper(argv.image);