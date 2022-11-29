"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async cloudLogin() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.cloudLogin();
  }
  async cloudRegister() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.cloudRegister();
  }
  async editUserMsg() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.editUserMsg();
  }
  async getUserMsg() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getUserMsg();
  }
}

module.exports = HomeController;
