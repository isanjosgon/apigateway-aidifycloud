// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

class InvalidateUserUseCase
{
  constructor (repo,res) {
    this.repo = repo;
  }
  execute (id) {
    this.repo
      .invalidate(id)
      .then(function (res) {
        res ? res.ok(res) : null;
      })
      .catch(function (err) {
        res ? res.ko('Impossible invalidate user.') : null;
      });
  }
}

module.exports = InvalidateUserUseCase;
