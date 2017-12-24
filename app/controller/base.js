'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  testLogin() {
    if (!this.ctx.session.user) {
      this.ctx.throw(401);
    }
  }

  notFound() {
    this.ctx.throw(404);
  }
}
module.exports = BaseController;
