(function() {

'use strict';

const request = require('superagent');
const async = require('async');

class HealthCheck {
	
	constructor(endpoints, logger) {
		this.endpoints = endpoints;
		this.logger = logger;
	}

	check() {
	let self = this;
	// Check aidify cloud services
	async.each(self.endpoints, function(endpoint, callback) {
		request.
			get(endpoint)
			.end(function(err, res) {
				if (err) {
					self.logger.error(endpoint + " service KO");
					return callback(err);
				}
				
				self.logger.log(endpoint + " service OK");
				callback();
			})
		}, function(err) {
			if (err) {
				self.logger.error("Some services are KO");
				return;
			}
			
			self.logger.log("ai{D}FY cloud is up and ready");
		});
	}
}

module.exports = HealthCheck;

})();