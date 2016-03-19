// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

require('./config');

const Server = require('./restapi/server');
const Broker = require('./messagebroker/broker');

new Server();
new Broker();
