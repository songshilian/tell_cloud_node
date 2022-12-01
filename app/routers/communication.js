/**
 * communication 集群
 */

const communication = (app)=>{
  const { router, controller } = app;
  // 添加用户信息（新增用户的联系人列表）
  router.post('/api/getAddUserMessage', controller.communication.getAddUserMessage);
  router.post('/api/getUserCircle', controller.communication.getUserCircle);
  router.post('/api/getAddUserCircle', controller.communication.getAddUserCircle);
}

module.exports = communication