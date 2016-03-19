// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const env = require('node-env-file');
let file = process.env.NODE_ENV || 'dev';
env(__dirname + '/.' + file);
