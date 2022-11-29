/* eslint valid-jsdoc: "off" */

"use strict";
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1669453014857_7473";

  // add your middleware config here
  config.middleware = [];

  // 配置运行时相关文件存储路径
  config.rundir = process.cwd() + '/run';
  
  // 配置日志目录
  config.logger = {
     dir: path.join(process.cwd(), 'logs'),
  };
  
  // 配置静态资源路径
  config.static = { 
    prefix: '/',
    dir: process.cwd() + '/public',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: false,
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: "rm-bp1glscfiws1us7o6co.mysql.rds.aliyuncs.com",
        // 端口号
        port: "3306",
        // 用户名
        user: "root",
        // 密码
        password: "Song5591250",
        // 数据库名
        database: "tell_cloud_node",
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    cors: {
      origin: "*",
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
