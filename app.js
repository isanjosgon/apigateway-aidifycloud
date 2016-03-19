// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const config = require('./config');
const Logger = require('./interface/logger');

const Server = require('./restapi/server');
const Broker = require('./messagebroker/broker');

let logger = new Logger(config.logging);

new Server(config.restapi,logger);
new Broker(config.messagebroker,logger);
