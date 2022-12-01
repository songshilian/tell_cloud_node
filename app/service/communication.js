"use strict";
const err = require("../utils/err")
const Service = require("egg").Service;

class Communication extends Service {
  async getAddUserMessage() {
    const { ctx, app } = this;
    const { userId, addUserId } = app.request.body;
    console.log(userId);
  }

  async getUserCircle() {
    const { ctx, app } = this;
    const { userId } = app.request.body;
    return {};
  }
  /**
   * getAddUserCircle 发布留言板信息
   * @param userId 用户id
   * @param userContent 用户内容文案
   * @param userCirleImg 用户上传北京地址
   */
  async getAddUserCircle() {
    try{
        const { ctx, app } = this;
        
    }catch(e){
        return {
            ...err.err1
        }
    }
    
  }
}

module.exports = Communication;
