"use strict";
const { Controller } = require("egg");

class Communication extends Controller {
    async getAddUserMessage () {
        const {ctx} = this;
        ctx.body = await ctx.service.communication.getAddUserMessage()
    }
    async getUserCircle() {
        const {ctx} = this;
        ctx.body = await ctx.service.communication.getUserCircle()
    }
    async getAddUserCircle() {
        const {ctx} = this;
        ctx.body = await ctx.service.communication.getAddUserCircle()
    }

}
module.exports = Communication;
