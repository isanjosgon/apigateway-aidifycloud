(function() {

'use strict';

const Activity = require('./activity');

module.exports.activityfromjson = function(json) {

	return new Activity(
		json['repo'],
		json['points'],
		json['type'],
		json['action']
	);

}

})();