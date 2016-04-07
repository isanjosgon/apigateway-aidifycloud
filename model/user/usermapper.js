// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const User = require('./user');
const _ = require('lodash');
const activityMapper = require('./activitymapper');
const statsMapper = require('./statsmapper');

exports.userfromjson = function(json)
{
	let activities;
	if(json['activities']) {
		activities = _.map(json['activities'], activityMapper.activityfromjson)
	}
	
	let stats;
	if(json['stats']) {
		stats = statsMapper.statsfromjson(json['stats']);
	}
	
	return new User(
		json['id'],
		json['login'],
		json['name'],
		json['location'],
		json['avatar'],
		activities,
		stats
	);
}

exports.apiToUpdateService = function(user) {
	
	return {
		id: user.id,
		login: user.name,
		name: user.realName,
		location: user.location,
		avatar: user.avatar
	};
}

exports.apiToCreateService = function(user) {
	
	return {
		login: user.username
	};
}