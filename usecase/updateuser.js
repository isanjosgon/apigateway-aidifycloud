(function() {

'use strict';

class UpdateUser {

	constructor(repo) {
		this.repo = repo;
	}
	
	execute(params, res) {
		this.repo
			.update(params)
			.then(function(user) {
				res ? res.ok(user) : null;
			})
			.catch(function(err) {
				res ? res.ko(err) : null;
			});
	}
}

module.exports = UpdateUser;

})();