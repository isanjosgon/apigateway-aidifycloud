// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const _ = require('lodash');

class GetUserUseCase
{
  constructor (repo) {
    this.repo = repo;
  }
  execute (params,res) {
		console.log("User: " + params.id);
    this.repo
      .findbyId(params.id)
      .then(function (user) {
        res && res.ok(user);
      })
      .catch(function (err) {
        res && res.ko(err);
      });
  }
}

module.exports = GetUserUseCase;
