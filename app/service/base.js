'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  getTotalPage(total, pageSize) {
    return parseInt(total / pageSize, 0) + (total % pageSize > 0 ? 1 : 0);
  }

  fixPage(page, totalPage) {
    if (!page || page < 1) page = 1;
    if (page > totalPage) page = totalPage;

    return page;
  }
}

module.exports = BaseService;
