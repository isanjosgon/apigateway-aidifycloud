// Created by Isra San Jose Gonzalez
// @aidify 22/03/2016

'use strict'

class CreateUserUseCase
{
  constructor (repo) {
    this.repo = repo;
  }
  execute (params,res) {
	let userToCreate = { 'login': params.username };
    this.repo
      .create(userToCreate)
      .then(function (user) {
        res ? res.ok(user) : null;
      })
      .catch(function (err) {
		  console.log("ERROR %j", err);
        res ? res.ko('Impossible connect to user service.') : null;
      });
  }
}

module.exports = CreateUserUseCase;
