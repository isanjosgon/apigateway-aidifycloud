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
  create (token,callback) {
    const self = this;
    request
      .post(self.config.cloud.githubservice + '/user')
      .send(token)
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }
        callback(self.parser.userfromjson(res.body));
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
        callback(self.parser.userfromjson(res.body));
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
        callback(res.body);
      });
  }
}

module.exports = DataStrategy;
