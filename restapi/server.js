// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const restify = require('restify');
const Response = require('./response');

class Server
{
  constructor (config, logger, getuser, createuser, updateuser) {
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
	
    api.get('/user/:name',function (req,res) {
      if (logger) {
        logger.log('request GET : /user/' + req.params.name);
      }
      getuser.execute(req.params,new Response(res,logger));
    });
	
    api.post('/user',function (req,res) {
      if (logger) {
        logger.log('request POST : /user');
        logger.log(JSON.stringify(req.body));
      }
      createuser.execute(JSON.parse(req.body),new Response(res,logger));
    });
	
    api.put('/user/:name',function (req,res) {
      if (logger) {
        logger.log('request PUT : /user/' + req.params.name);
        logger.log(JSON.stringify(req.body));
      }
	  
      updateuser.execute(JSON.parse(req.body), new Response(res,logger));
    });

    api.listen(config.port,function () {
      logger.log(config.name + ' up and ready');
    });
  }
}

module.exports = Server;
