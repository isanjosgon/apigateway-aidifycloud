// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const redis = require('redis');

class Broker
{
  constructor () {
    if (process.env.REDIS_HOST) {
      this.client = redis.createClient(process.env.REDIS_HOST,process.env.REDIS_PORT);
      this.client.auth(process.env.REDIS_PASSWORD);
    } else {
      this.client = redis.createClient();
    }
  }
}

module.exports = Broker;
