'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/cloudLogin', controller.home.cloudLogin);
  router.post('/api/cloudRegister', controller.home.cloudRegister);
  router.post('/api/editUserMsg', controller.home.editUserMsg);
  router.post('/api/getUserMsg', controller.home.getUserMsg);
};
