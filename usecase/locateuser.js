// Created by Isra San Jose Gonzalez
// @aidify 22/03/2016

'use strict'

class LocateUserUseCase
{
  constructor (repo) {
    this.repo = repo;
  }
  execute (params,res) {
    this.repo
      .locate(params.userid,params.status)
      .then(function (res) {
        res ? res.ok(res) : null;
      })
      .catch(function (err) {
        res? res.ko('Impossible connect to user service.') : null;
      });
  }
}

module.exports = LocateUserUseCase;
