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
      const newData = data.map((item)=>{
        return {
          ...item,
          messageCall:JSON.parse(item.messageCall)
        }
      })
      return {
        data: newData,
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
   * @param userName 发布的用户名称
   * @param userContent 用户内容文案
   * @param circleImg 用户上传图片地址
   * @param circleCurrentTime 发布时间
   * @param userHeadProtraitUrl 用户头像
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
   * @param respondDate 评论的当前日期时间
   */
  async commentCircleMsg() {
    try {
      const { ctx, app } = this;
      const { id, commentStatus,respondDate, respondMessage, ...rest } = ctx.request.body;
      console.log(id, "1111");
      const circleData = await app.mysql.select("user_circle", {
        where: {
          id,
        },
      }); // 查询 id （返回是一个数组 取第0个 ）
      console.log(circleData[0], "circleData");
      const newCircleData = circleData[0];
      const messageCall = newCircleData.messageCall ?? [];
      let commentData =
        typeof messageCall === "string" ? JSON.parse(messageCall) : messageCall;
      console.log(commentData);
      if (commentStatusEnum.author === commentStatus) {
        // 评论
        const { respondCircleName, respondUserId } = {
          ...rest,
        };
        commentData = [
          ...commentData,
          {
            respondCircleName,
            respondMessage,
            respondUserId,
            respondDate,
            commentStatus: commentStatusEnum.author,
          },
        ];
      } else if (commentStatusEnum.respond === commentStatus) {
        // 回复评论
        const { replyName, replyNameUserId } = {
          ...rest,
        };
        commentData = [
          ...commentData,
          {
            respondCircleName,
            respondMessage,
            replyNameUserId,
            replyName,
            respondDate,
            commentStatus: commentStatusEnum.author,
          },
        ];
      }
      newCircleData.messageCall = JSON.stringify(commentData); // 修改messageCall字段
      console.log(newCircleData, "circleDatacircleData");
      const data = await app.mysql.update(
        // 修改朋友圈记录信息
        `user_circle`,
        {
          ...newCircleData,
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
