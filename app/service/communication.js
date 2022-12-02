"use strict";
const await = require("await-stream-ready/lib/await");
const err = require("../utils/err");
const Service = require("egg").Service;
const communicationConstant = require("../constant/communication");
const { commentStatusEnum } = communicationConstant;
class Communication extends Service {
  async getAddUserMessage() {
    const { ctx, app } = this;
    const { userId, addUserId } = ctx.request.body;
    console.log(userId);
  }

  /**
   * getUserCircle 获取朋友圈信息列表
   * @param userId 用户id
   */
  async getUserCircle() {
    try {
      const { ctx, app } = this;
      // const { userId } = ctx.request.body;
      const data = await app.mysql.query(`select * from user_circle`);
      console.log(data);
      return {
        data: data,
        message: "成功",
        code: "000000",
      };
    } catch (e) {
      return {
        ...err.err1,
        data: e,
      };
    }
  }
  /**
   * getAddUserCircle 发布留言板信息
   * @param userId 用户id
   * @param userContent 用户内容文案
   * @param userCirleImg 用户上传北京地址
   */
  async getAddUserCircle() {
    try {
      const { ctx, app } = this;
      const {} = ctx.request.body;
      console.log(ctx.request.body);
      const data = await app.mysql.insert("user_circle", {
        ...ctx.request.body,
      });
      console.log(data);
      if (data) {
        return {
          code: "000000",
          data: null,
          message: "新增成功",
        };
      }
    } catch (e) {
      return {
        ...err.err1,
        data: e,
      };
    }
  }
  /**
   * commentCircleMsg 朋友圈留言（评论）回复
   * @param id 朋友圈记录id
   * @param respondUserId 评论用户id
   * @param respondCircleName 评论人名称
   * @param commentStatus 评论人（回复状态）
   * @param replyName 回复人名称
   * @param replyNameUserId 回复人Id
   * @param respondMessage 评论信息
   */
  async commentCircleMsg() {
    try {
      const { ctx, app } = this;
      const { id, commentStatus, ...rest } = ctx.request.body;
      console.log(id, "1111");
      const circleData = await app.mysql.query(
        `select * from user_circle where  id like "%${id}"}`
      ); // 查询 id （返回是一个数组 取第0个 ） 
      console.log(circleData,'circleData')
      let commentData = JSON.parse(commentData) = circleData.messageCall ?? [];
      if (commentStatusEnum.author === commentStatus) {
        // 评论
        const { respondMessage, respondCircleName, respondUserId } = {
          ...rest,
        };
        commentData = [
          ...commentData,
          {
            respondCircleName,
            respondMessage,
            respondUserId,
            commentStatus: commentStatusEnum.author,
          },
        ];
      } else if (commentStatusEnum.respond === commentStatus) {
        // 回复评论
        const { respondMessage, replyName, replyNameUserId } = {
          ...rest,
        };
        commentData = [
          ...commentData,
          {
            respondCircleName,
            respondMessage,
            replyNameUserId,
            replyName,
            commentStatus: commentStatusEnum.author,
          },
        ];
      }
      circleData.messageCall = JSON.stringify(commentData); // 修改messageCall字段
      console.log(circleData)
      const data = await app.mysql.update( // 修改朋友圈记录信息
        `user_circle`,
        {
          circleData,
        },
        {
          where: {
            id,
          },
        }
      );
      if (data) {
        return {
          code: "000000",
          message: "评论成功",
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        ...err.err1,
        data: e,
      };
    }
  }
}

module.exports = Communication;
