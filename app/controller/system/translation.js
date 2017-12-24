'use strict';

const BaseController = require('../base');

class TranslationController extends BaseController {
  async index() {
    this.testLogin();

    const { keyword, sort, page, pageSize } = this.ctx.query;
    this.ctx.body = await this.service.translation.search({
      keyword,
      sort,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  }

  async create() {
    this.testLogin();

    const index = this.ctx.request.body.index;
    const zhCN = this.ctx.request.body['zh-CN'];
    const enUS = this.ctx.request.body['en-US'];

    const createRule = {
      index: {
        type: 'string',
      },
      'zh-CN': {
        type: 'string',
      },
      'en-US': {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      index,
      'zh-CN': zhCN,
      'en-US': enUS,
    });

    if (await this.service.translation.viewByIndex(index)) {
      this.ctx.throw(409, {
        error: 'duplicated_item',
      });
    }

    this.ctx.body = {
      _id: await this.service.translation.create({
        index,
        'zh-CN': zhCN,
        'en-US': enUS,
      }),
    };
  }

  async view() {
    this.testLogin();

    const id = this.ctx.params.id;
    this.ctx.body = await this.service.translation.view(id);
  }

  async patch() {
    this.testLogin();
    const id = this.ctx.params.id;

    const zhCN = this.ctx.request.body['zh-CN'];
    const enUS = this.ctx.request.body['en-US'];

    const createRule = {
      'zh-CN': {
        type: 'string',
      },
      'en-US': {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      'zh-CN': zhCN,
      'en-US': enUS,
    });

    const translation = await this.service.translation.patch(id, {
      'zh-CN': zhCN,
      'en-US': enUS,
    });
    if (translation) {
      this.ctx.body = translation;
    } else {
      this.ctx.throw(422);
    }
  }

  async delete() {
    this.testLogin();

    const ids = this.ctx.params.id;
    if (!ids) return this.notFound();


    this.ctx.body = await this.service.translation.delete(ids.split(','));
  }
}

module.exports = TranslationController;
