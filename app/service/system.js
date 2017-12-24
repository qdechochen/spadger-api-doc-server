'use strict';

const Service = require('egg').Service;

class SystemService extends Service {
  async language() {
    return await this.ctx.model.Translation.find().select('index zh-CN en-US meta').lean();
  }
}

module.exports = SystemService;
