// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

const request = require('superagent');

class DataStrategy
{
  constructor (config,parser) {
    this.config = config;
    this.parser = parser;
  }
  create (user,callback) {
    const self = this;
			console.log("User: %j", user);
    request
      .post(self.config.cloud.githubservice + '/user')
      .send(JSON.stringify(user))
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }
		
        callback(null, self.parser.userfromjson(res.body.result));
      });
  }
  getbyId (id,callback) {
    const self = this;
    request
      .get(self.config.cloud.userservice + '/user/' + id)
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }
        callback(null, self.parser.userfromjson(res.body.result));
      });
  }
  locate (id,status) {
    const self = this;
    request
      .post(self.config.cloud.userservice + '/user/' + id + '/status')
      .send(status)
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }
        callback(null, res.body);
      });
  }
}

module.exports = DataStrategy;
