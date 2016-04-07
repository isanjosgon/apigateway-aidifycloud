// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

class User
{
  constructor (id, name, realName, location, avatar, activities, stats) {
    this.id = id;
    this.name = name;
	this.realName = realName;
	this.location = location;
	this.avatar = avatar;
	this.activities = activities;
	this.stats = stats;
  }
}

module.exports = User;
