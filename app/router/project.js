'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/projects', controller.project.index);
  router.post('/projects', controller.project.create);
  router.get('/projects/:id', controller.project.view);
  router.patch('/projects/:id', controller.project.patch);
  router.delete('/projects/:id', controller.project.delete);
  router.get('/projects/:pid/apis', controller.project.searchApis);
};

