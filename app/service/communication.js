"use strict";
const await = require("await-stream-ready/lib/await");
const err = require("../utils/err");
const Service = require("egg").Service;

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
      const data =await app.mysql.query(
        `select * from user_circle`
      )
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
}

module.exports = Communication;
