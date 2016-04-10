(function() {

'use strict';

const request = require('superagent');
const async = require('async');

module.exports = function(endpoints, logger) {
	
	// Check aidify cloud services
	async.each(endpoints, function(endpoint, callback) {
		request.
			get(endpoint)
			.end(function(err, res) {
				if (err) {
					logger.error(endpoint + " service KO");
					return callback(err);
				}
				
				logger.log(endpoint + " service OK");
				callback();
			})
		}, function(err) {
			if (err) {
				logger.error("Some services are KO");
				return;
			}
			
			logger.log("ai{D}FY cloud is up and ready");
		});
}

})();