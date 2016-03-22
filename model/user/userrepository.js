// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

class UserRepository
{
  constructor (dataStrategy,cacheStrategy) {
    this.dataStrategy = dataStrategy;
    this.cacheStrategy = cacheStrategy;
  }
  create (token) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.dataStrategy.create(token,function (err,user) {
        if (err) {
          return reject(err);
        }
        resolve(user);
        self.cacheStrategy.insert(user);
      });
    });
  }
  findbyId (id) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.cacheStrategy.fetch(id,function (err,user) {
        if (err) {
          return reject(err);
        }
        if (user) {
          return resolve(user);
        }
        self.dataStrategy.getbyId(id,function (err,user) {
          if (err) {
            return reject(err);
          }
          resolve(user);
          self.cacheStrategy.insert(user);
        });
      });
    });
  }
  locate (id,status) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.dataStrategy.locate(function (err,user) {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }
  invalidate (id) {
    const self = this;
    return new Promise(function (resolve,reject) {
      self.cacheStrategy.invalidate(id,function (err) {
        if (err) {
          return;
        }
        self.findbyId(id);
      });
    });
  }
}

module.exports = UserRepository;
