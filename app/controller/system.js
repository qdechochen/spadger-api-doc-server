'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async language() {
    this.ctx.body = await this.service.system.language();
  }

  async clientConfigs() {
    this.ctx.body = this.ctx.app.config.client;
  }
}

module.exports = UserController;
