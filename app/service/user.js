'use strict';

const BaseService = require('./base');

class UserService extends BaseService {
  async login(mobile, password) {
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');

    const encryptedPassword = md5.update(password + this.ctx.app.config.g_secret).digest('hex');
    const user = await this.ctx.model.User.findOne({
      mobile,
      password: encryptedPassword,
      deleted: false,
    }).select('name mobile avatar email flags')
      .lean();

    return user;
  }

  async getLoginInfo(id) {
    const user = await this.ctx.model.User.findOne({
      _id: id,
      deleted: false,
    }).select('name mobile avatar email flags')
      .lean();

    return user;
  }
}

module.exports = UserService;
