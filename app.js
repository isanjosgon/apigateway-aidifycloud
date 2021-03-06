// Created by Isra San Jose Gonzalez
// @aidify 19/03/2016

'use strict'

const config = require('./config');
const Logger = require('./interface/logger');

const Server = require('./restapi/server');
const Broker = require('./messagebroker/broker');

const UserMapper = require('./model/user/usermapper');
const CacheStrategy = require('./model/user/cachestrategy');
const DataStrategy = require('./model/user/datastrategy');
const UserRepository = require('./model/user/userrepository');

const GetUserUseCase = require('./usecase/getuser');
const CreateUserUseCase = require('./usecase/createuser');
const UpdateUserUseCase = require('./usecase/updateuser');
const InvalidateUserUseCase = require('./usecase/invalidateuser');

let logger = new Logger(config.logging);

let cacheStrategy = new CacheStrategy(config.cache);
let dataStrategy = new DataStrategy(config,UserMapper);
let userrepo = new UserRepository(dataStrategy,cacheStrategy);

let getUserUseCase = new GetUserUseCase(userrepo);
let createUserUseCase = new CreateUserUseCase(userrepo);
let updateUserUseCase = new UpdateUserUseCase(userrepo);
let invalidateUserUseCase = new InvalidateUserUseCase(userrepo);

new Server(config.restapi,logger,getUserUseCase,createUserUseCase, updateUserUseCase);
new Broker(config.messagebroker,logger,invalidateUserUseCase);

// Healthcheck Cron bootstrap
const HealthCheck = require('./interface/healthcheck');
const Cron = require('./interface/cron.js');

let healthCheck = new HealthCheck(config.cloud, logger);

new Cron(logger, healthCheck, config.cron);