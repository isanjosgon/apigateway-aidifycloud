// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const User = require('./user');

exports.userfromjson = function (json)
{
  return new User(
    json['profile']['name']
  );
}
