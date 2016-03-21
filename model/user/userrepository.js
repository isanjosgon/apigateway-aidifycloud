// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const request = require('superagent');

class UserRepository
{
  constructor (config,parse) {
    this.config = config;
    this.parser = parser;
  }
  findbyId (id) {
    var self = this;
    return new Promise(function (resolve,reject) {
      request
        .get(self.config.cloud.userservice + '/user/' + id)
        .end(function (err,res) {
          if (err) {
            return reject(err);
          }
          resolve(self.parser.userfromjson(res.body));
        });
    });
  }
}

module.exports = UserRepository;
