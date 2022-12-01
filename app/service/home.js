"use strict";

const jwt = require("jsonwebtoken");
const Service = require("egg").Service;
const guid = require("../utils/guid");
const md5 = require("blueimp-md5");
const err = require("../utils/err")
const fs = require("fs");
const path = require('path'); // node的path路径模块
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class HomeService extends Service {
  /**
   * cloudLogin 登入
   */
  async cloudLogin() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    console.log(username, password);
    const data = await app.mysql.get("user_login", {
      password,
      username,
    });
    console.log(data);
    if (data) {
      const token = jwt.sign({ ...data }, app.config.keys, {
        expiresIn: "24h",
      });
      const { userId } = await app.mysql.query(
        `select * from user_login where username like "%${username}"`
      );
      return {
        token,
        userId,
        code: "000000",
      };
    } else {
      return {
        code: "000001",
        msg: "密码或账号输入错误",
      };
    }
  }
  /**
   * cloudRegister 注册
   */
  async cloudRegister() {
    try {
      const { ctx, app } = this;
      const { username, password, name, age, userMsg } = ctx.request.body;
      console.log(username);
      const data = await app.mysql.query(
        `select * from user_login where username like "%${username}"`
      );
      console.log(data);
      if (!data.length) {
        const uuid = guid.getGuid();
        console.log(uuid);
        const dataLogin = await app.mysql.insert("user_login", {
          username,
          password,
          userId: uuid,
        });
        const dataMessage = await app.mysql.insert("user_message", {
          name,
          age,
          userId: uuid,
        });
        if (dataMessage && dataLogin) {
          return {
            code: "000000",
            msg: "注册成功",
            data: null,
          };
        }
        console.log(data);
      } else {
        return {
          code: "000001",
          msg: "用户名重复",
        };
      }
    } catch (e) {
      return {
        code: "999999",
        message: e,
      };
    }
  }
  /**
   * editUserMsg 编辑用户信息
   */
  async editUserMsg() {
    try {
      const { ctx, app } = this;
      const { userId, ...rest } = ctx.request.body;
      if (userId) {
        const { name, age, userMsg } = { ...rest };
        const data = await app.mysql.update(
          "user_message",
          {
            name,
            age,
            userMsg,
          },
          {
            where: {
              userId,
            },
          }
        );
        return {
          code: "000000",
          msg: "个人信息编辑成功",
          data: null,
        };
      }
    } catch (e) {
      return {
        code: "999999",
        msg: "服务端异常",
        data: e,
      };
    }
  }
  /**
   * getUserMsg 获取用户信息
   */
  async getUserMsg() {
    try {
      const { ctx, app } = this;
      const { userId } = ctx.request.body;
      if (userId) {
        const data = await app.mysql.get("user_login", {
          userId,
        });
        if (data) {
          console.log(data);
          return {
            code: "000000",
            message: "获取信息成功",
            data: data,
          };
        } else {
          return {
            code: "000001",
            message: "获取用户信息失败",
            data: null,
          };
        }
      }
    } catch (e) {
      return {
        code: "999999",
        message: e,
      };
    }
  }
  /**
   * uploadImage 图片上传
   */
  async uploadImage() {
    const { ctx, app } = this;
    const stream = await this.ctx.getFileStream(); // egg中获取上传文件的方法
    const filename = md5(new Date().getTime()) + ".png";
    const target = path.join(
      "/usr/share/nginx/html/static/tell_colud_img/upload/",
      filename
    );
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream)); // 异步写入文件
      return {
        code: "000000",
        msg: "上传成功",
        data: {
          src: `http://106.14.145.176/images/${filename}`,
        },
      };
    } catch (err) {
      await sendToWormhole(stream); // 如果失败，关闭文件流
      return {
          ...err.err16
      }
    }
  }
}

module.exports = HomeService;
