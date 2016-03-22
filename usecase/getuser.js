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
    this.repo
      .findbyId(params.id)
      .then(function (user) {
        res.ok && res.ok(user);
      })
      .catch(function (err) {
        res.ko && res.ko('Impossible connect to user service.');
      });
  }
}

module.exports = GetUserUseCase;
