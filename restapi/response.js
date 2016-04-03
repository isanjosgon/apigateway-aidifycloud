// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

class Response
{
  constructor (response,logger) {
    this.response = response;
    this.logger = logger;
  }
  ok (res,status) {
    this.response.status(status || 200);
    this.response.send(res);
  }
  ko (err,status) {
    this.response.status(status || 500);
    this.response.send({ error:err });
  }
  pong () {
    this.response.status(200);
    this.response.send({ answer:'pong!' });
  }
}

module.exports = Response;
