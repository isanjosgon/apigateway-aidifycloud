(function() {

'use strict';

class Activity {

	constructor(repo, points, type, action, createdAt) {
		this.repo = repo;
		this.points = points;
		this.type = type;
		this.action = action;
		this.createdAt = createdAt;
	}

}

module.exports = Activity;

})();