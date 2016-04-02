(function() {

'use strict';

class Activity {

	constructor(repo, points, type, action) {
		this.repo = repo;
		this.points = points;
		this.type = type;
		this.action = action;
	}

}

module.exports = Activity;

})();