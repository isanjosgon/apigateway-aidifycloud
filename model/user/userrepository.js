// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

class UserRepository
{
  constructor (dataStrategy,cacheStrategy) {
    this.dataStrategy = dataStrategy;
    this.cacheStrategy = cacheStrategy;
  }
  create (user) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.dataStrategy.create(user, function (err,result) {
        if (err) {
          return reject(err);
        }
		
        resolve(result);
        self.cacheStrategy.insert(result);
      });
    });
  }

  update(user) {
    const self = this;
    return new Promise(function(resolve,reject) {
      self.dataStrategy.update(user, function(err,result) {
        if (err) {
          return reject(err);
        }
		
        resolve(result);
        self.cacheStrategy.insert(result);
      });
    });
  }

  findbyName(name) {
    let self = this;
    return new Promise(function (resolve,reject) {
      self.cacheStrategy.fetch(name, function (err,user) {
        if (err) {
          return reject(err);
        }
        if (user) {
          return resolve(user);
        }
        self.dataStrategy.getbyName(name,function (err,user) {
          if (err) {
			console.log("err %j", err);
            return reject(err);
          }
          resolve(user);
          self.cacheStrategy.insert(user);
        });
      });
    });
  }

  invalidate(name) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.cacheStrategy.invalidate(name,function (err) {
        if (err) {
          return err;
        }
        
		return;
      });
    });
  }
}

module.exports = UserRepository;
