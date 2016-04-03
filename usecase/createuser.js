// Created by Isra San Jose Gonzalez
// @aidify 22/03/2016

'use strict'

class CreateUserUseCase
{
  constructor (repo) {
    this.repo = repo;
  }
  execute (params,res) {
    this.repo
      .create(params)
      .then(function (user) {
        res ? res.ok(user) : null;
      })
      .catch(function (err) {
        res ? res.ko(err) : null;
      });
  }
}

module.exports = CreateUserUseCase;
