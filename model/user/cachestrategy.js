// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

const redis = require('redis');

class CacheStrategy
{
  constructor (config) {
    /*if (process.env.REDISTOGO_URL) {
      let rtg = require('url').parse(process.env.REDISTOGO_URL);
      this.client = redis.createClient(rtg.port,rtg.hostname);
      this.client.auth(rtg.auth.split(':')[1]);*/
      this.client = redis.createClient(config.messagebroker.port, config.messagebroker.host);
      this.client.auth(config.messagebroker.pass);
	  console.log("REDIS CACHE STARTED: %j", config.cache);
	  this.config = config.cache;
    /*} else {
      this.client = redis.createClient();
    }*/
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
