'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/loginWithToken', controller.user.loginWithToken);
  router.post('/login', controller.user.login);
};
