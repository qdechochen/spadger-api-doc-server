'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async login() {
    const { ctx, service } = this;
    const { mobile, password } = ctx.request.body;

    const createRule = {
      mobile: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    };

    ctx.validate(createRule, {
      mobile,
      password,
    });
    const user = await service.user.login(mobile, password);
    if (user) {
      ctx.session.user = user._id;
      ctx.body = user;
    } else {
      ctx.status = 401;
    }
  }
  async loginWithToken() {
    this.testLogin();

    const { ctx, service } = this;
    const user = await service.user.getLoginInfo(ctx.session.user);

    if (user) {
      ctx.session.user = user._id;
      ctx.body = user;
    } else {
      ctx.status = 401;
    }
  }

  async xtplTest() {
    const data = this.ctx.service.home.list(2);
    console.dir(data);
    this.ctx.session.loginuser = 'Echo Chen';
    await this.ctx.render('xtpltest.xtpl', await data);
  }
}

module.exports = UserController;
