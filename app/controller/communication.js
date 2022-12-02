"use strict";
const await = require("await-stream-ready/lib/await");
const { Controller } = require("egg");

class Communication extends Controller {
  async getAddUserMessage() {
    const { ctx } = this;
    ctx.body = await ctx.service.communication.getAddUserMessage();
  }
  async getUserCircle() {
    const { ctx } = this;
    ctx.body = await ctx.service.communication.getUserCircle();
  }
  async getAddUserCircle() {
    const { ctx } = this;
    ctx.body = await ctx.service.communication.getAddUserCircle();
  }
  async commentCircleMsg() {
    const { ctx } = this;
    ctx.body = await ctx.service.communication.commentCircleMsg();
  }
}
module.exports = Communication;
