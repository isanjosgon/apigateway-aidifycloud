// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const restify = require('restify');
const Response = require('./response');

class Server
{
  constructor (config,logger,getuser) {
    let api = restify.createServer({
      name: config.name,
      version: config.version
    });
    api.use(restify.acceptParser(api.acceptable));
    api.use(restify.queryParser());
    api.use(restify.bodyParser());

    api.get('/',function (req,res) {
      let response = new Response(res);
      response.pong();
    });
    api.get('/user/:id',function (req,res) {
      if (logger) {
        logger.info('request GET : /user/' + JSON.stringify(req.params.id));
      }
      getuser.execute(req.params,new Response(res,logger));
    });

    api.listen(config.port,function () {
      logger.log(config.name + ' up and ready');
    });
  }
}

module.exports = Server;
