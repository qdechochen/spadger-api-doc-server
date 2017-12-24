'use strict';
const clientConfigs = require('./client');

module.exports = appInfo => {
  const config = exports = {};
  config.static = {
    prefix: '/',
    dir: './app/public',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513079238844_9452';


  config.g_secret = ')3Onx(*(*#@:><!+$%)';

  config.client = clientConfigs;

  // add your config here
  config.session = {
    key: '___spadger',
    httpOnly: false,
  };

  config.security = {
    csrf: false,
    domainWhiteList: [ 'http://localhost:9001' ],
  };

  config.cors = {
    allowMethods: [ 'GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH' ],
    exposeHeaders: [ 'Set-Cookie', 'Access-Control-Allow-Credentials' ],
    allowHeaders: [ 'Set-Cookie', 'lang', 'Content-Type', 'Authorization', 'Access-Control-Allow-Credentials' ],
    credentials: true,
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/spadger-api-doc',
    options: {},
  };

  config.middleware = [
    'errorHandler',
  ];

  config.errorHandler = {
    match: '/api',
  };

  // xtpl
  config.view = {
    defaultViewEntine: 'xtpl',
    mapping: {
      '.xtpl': 'xtpl',
    },
  };
  config.xtpl = {};

  // services

  return config;
};

