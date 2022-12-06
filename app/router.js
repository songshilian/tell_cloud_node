'use strict';
const communication = require('./routers/communication')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户信息操作
  router.get('/', controller.home.index);
  router.post('/api/cloudLogin', controller.home.cloudLogin);
  router.post('/api/cloudRegister', controller.home.cloudRegister);
  router.post('/api/editUserMsg', controller.home.editUserMsg);
  router.post('/api/getUserMsg', controller.home.getUserMsg);
  router.post('/api/uploadImage',controller.home.uploadImage)
  // 用户交互操作
  communication(app)
};
