/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.keys = appInfo.name + '_1552704950750_6494';


  const sequelize = {
    dialect: 'mysql',
    database: 'puppeteer_db',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '记得修改成自己密码',
  };

  const puppeteerConfig = {
    common_waiting_time: 3000,
  }

  return {
    ...config,
    sequelize,
    puppeteerConfig,
  };
};
