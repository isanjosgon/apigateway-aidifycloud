// Created by Isra San Jose Gonzalez
// @aidify 21/03/2016

'use strict'

const request = require('superagent');
const async = require('async');

class DataStrategy
{
  constructor (config,parser) {
    this.config = config;
    this.parser = parser;
  }
  create(user, callback) {
    const self = this;
    request
      .post(self.config.cloud.githubservice + '/user')
      .send(JSON.stringify(self.parser.apiToCreateService(user)))
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }

		self._getAllUserData(res.body.result, callback);
      });
  }
  
	update(user, callback) {
	  const self = this;
	  request
		.put(self.config.cloud.userservice + '/user/' + user.name)
		.send(JSON.stringify(self.parser.apiToUpdateService(user)))
		.end(function(err, res) {
			if(err) {
				return callback(err);
			}

			self._getAllUserData(res.body.result, callback);
		});
	}

  getbyName(name, callback) {
    const self = this;
    request
      .get(self.config.cloud.userservice + '/user/' + name)
      .end(function (err, res) {
        if (err) {
          return callback(err);
        }
		
		self._getAllUserData(res.body.result, callback);
      });
  }
  
	_getAllUserData(user, callback) {
		const self = this;
		if (!user) {
			return callback({message: 'User not found'});
		}
		async.parallel([
			function(callback) {
				request
					.get(self.config.cloud.activityservice + '/activity')
					.query({ user: user.login})
					.end(function(err, res) {
						if (err) {
							return callback();
						}

						callback(null, res.body.result);
					});
			},
			function(callback) {
				request
					.get(self.config.cloud.statsservice + '/stats/' + user.login)
					.end(function(err, res) {
						if (err) {
							return callback();
						}

						callback(null, res.body.result);
					});
			}
		], function(err, result) {
			
			if (err) {
				console.log("Error retrieving user: %j", err);
			}

			user.activities = result[0];
			user.stats = result[1];
			callback(null, self.parser.userfromjson(user));
		});
	}
}

module.exports = DataStrategy;
