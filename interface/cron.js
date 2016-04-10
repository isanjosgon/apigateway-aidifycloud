(function() {

'use strict';

const CronJob = require('cron').CronJob;

class HealthcheckCron {

	constructor(logger, healthcheck, config) {
		try {
			new CronJob(config.expression, 
				function() {
					healthcheck.check()
				}, null, true, 'Europe/Madrid'
			);
		} catch(ex) {
			logger.error("cron pattern not valid");
		}
	}

}

module.exports = HealthcheckCron;

})();