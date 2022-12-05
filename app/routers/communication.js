/**
 * communication 集群
 */

const communication = (app) => {
  const { router, controller } = app;
  console.log(app,'app');
  // 添加用户信息（新增用户的联系人列表）接口
  router.post(
    "/api/getAddUserMessage",
    controller.communication.getAddUserMessage
  );
  // 朋友圈列表信息获取接口
  router.post("/api/getUserCircle", controller.communication.getUserCircle);
  // 朋友圈发布信息新增接口
  router.post(
    "/api/getAddUserCircle",
    controller.communication.getAddUserCircle
  );
  // 朋友圈留言评论接口
  router.post(
    "/api/commentCircleMsg",
    controller.communication.commentCircleMsg
  );
};
module.exports = communication;
