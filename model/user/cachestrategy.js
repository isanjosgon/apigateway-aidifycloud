// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

const redis = require('redis');

class CacheStrategy
{
  constructor (config) {
      this.client = redis.createClient(config.port, config.host);
      this.client.auth(config.pass);
	  console.log("REDIS CACHE STARTED: %j", config);
	  this.config = config;
  }
  fetch(id, callback) {
	if (!this.config.active) {
		return callback(null, null);
	}
    this.client.get('user:' + id,function (err,res) {
      callback(err, JSON.parse(res));
    });
  }
  insert (user,callback) {
	  
	if (!this.config.active) {
		this.client.set('user:' + user.name,JSON.stringify(user),callback);
	}
  }
  invalidate (id,callback) {
    this.client.del('user:' + id,callback);
  }
}

module.exports = CacheStrategy;
