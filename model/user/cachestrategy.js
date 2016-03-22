// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

const redis = require('redis');

class CacheStrategy
{
  constructor (config) {
    if (process.env.REDISTOGO_URL) {
      let rtg = require('url').parse(process.env.REDISTOGO_URL);
      this.client = redis.createClient(rtg.port,rtg.hostname);
      this.client.auth(rtg.auth.split(':')[1]);
    } else {
      this.client = redis.createClient();
    }
  }
  fetch (id,callback) {
    this.client.get('user:' + id,function (err,res) {
      callback(err,JSON.parse(res));
    });
  }
  insert (user,callback) {
    this.client.set('user:' + user.id,JSON.stringify(user),callback);
  }
  invalidate (id,callback) {
    this.client.del('user:' + id,callback);
  }
}

module.exports = CacheStrategy;
