'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/system/language', controller.system.language);
  router.get('/system/clientConfigs', controller.system.clientConfigs);

  router.get('/admin/system/translations', controller.system.translation.index);
  router.post('/admin/system/translations', controller.system.translation.create);
  router.get('/admin/system/translations/:id', controller.system.translation.view);
  router.patch('/admin/system/translations/:id', controller.system.translation.patch);
  router.delete('/admin/system/translations/:id', controller.system.translation.delete);
};
