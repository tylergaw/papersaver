#!/usr/bin/env node
var argv = require('optimist')
    .usage('Creates a new Paper entry from -i, --image.\nUsage: $0')
    .demand('i')
    .alias('i', 'image')
    .describe('i', 'The image from Paper')
    .argv;

var Papersaver = require('./papersaver'),
    paperSaver = new Papersaver();

paperSaver.save(argv.image);