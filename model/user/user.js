// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

class User
{
  constructor (id, name, location, avatar, activities) {
    this.id = id;
    this.name = name;
	this.location = location;
	this.avatar = avatar;
	this.activities = activities
  }
}

module.exports = User;
