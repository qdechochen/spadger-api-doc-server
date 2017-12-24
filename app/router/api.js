'use strict';

module.exports = app => {
  const { router, controller: { api } } = app;
  router.get('/apis', api.index);
  router.post('/apis', api.create);
  router.get('/apis/:id', api.view);
  router.patch('/apis/:id', api.patch);
  router.delete('/apis/:id', api.delete);
};

