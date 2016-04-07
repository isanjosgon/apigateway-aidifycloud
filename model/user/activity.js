(function() {

'use strict';

class Activity {

	constructor(repo, points, type, action, createdAt, affectedStats) {
		this.repo = repo;
		this.points = points;
		this.type = type;
		this.action = action;
		this.createdAt = createdAt;
		this.affectedStats = affectedStats;
	}

}

module.exports = Activity;

})();