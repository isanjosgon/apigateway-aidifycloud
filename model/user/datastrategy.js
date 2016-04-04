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
		
        callback(null, self.parser.userfromjson(res.body.result));
      });
  }
  
  update(user, callback) {
	  const self = this;
	  request
		.put(self.config.cloud.userservice + '/user/' + user.id)
		.send(JSON.stringify(self.parser.apiToUpdateService(user)))
		.end(function(err, res) {
			if(err) {
				return callback(err);
			}
			
			callback(null, self.parser.userfromjson(res.body.result));
		});
  }
  
  getbyId(id, callback) {
    const self = this;
    request
      .get(self.config.cloud.userservice + '/user/' + id)
      .end(function (err, res) {
        if (err) {
          return callback(err);
        }

		let user = res.body.result;
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
							return callback(null, null);
						}

						callback(null, res.body.result);
					});
			},
			function(callback) {
				request
					.get(self.config.cloud.statsservice + '/stats/' + user.login)
					.end(function(err, res) {
						if (err) {
							return callback(null, null);
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
		
      });
  }
  locate (id,status) {
    const self = this;
    request
      .post(self.config.cloud.userservice + '/user/' + id + '/status')
      .send(status)
      .end(function (err,res) {
        if (err) {
          return callback(err);
        }
        callback(null, res.body);
      });
  }
}

module.exports = DataStrategy;
