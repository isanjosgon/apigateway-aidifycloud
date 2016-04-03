// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const User = require('./user');
const _ = require('lodash');
const activityMapper = require('./activitymapper');

exports.userfromjson = function(json)
{
	let activities;
	
	if (json['activities']) {
		activities = _.map(json['activities'], activityMapper.activityfromjson)
	}
	
	return new User(
		json['id'],
		json['login'],
		json['location'],
		activities
	);
}

exports.apiToService = function(user) {
	
	return {
		id: user.id,
		login: user.name,
		location: user.location
	};
}