'use strict';

const BaseController = require('./base');

class ApiController extends BaseController {
  async index() {
    this.testLogin();

    const { keyword, sort, page, pageSize } = this.ctx.query;
    let select = this.ctx.query.select;
    if (select === 'full') {
      select = null;
    } else {
      select = 'url method';
    }
    this.ctx.body = await this.service.api.search({
      keyword,
      select,
      sort,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  }

  async create() {
    this.testLogin();

    const { url, title, introduction, method, request, response, errs, useGlobalErrs, project } = this.ctx.request.body;

    const createRule = {
      url: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      method: {
        type: 'string',
      },
      project: {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      url,
      title,
      project,
      method,
    });

    this.ctx.body = {
      _id: await this.service.api.create({
        url,
        title,
        introduction,
        method,
        request,
        response,
        errs,
        useGlobalErrs,
        project,
      }),
    };
  }

  async view() {
    this.testLogin();

    const id = this.ctx.params.id;
    this.ctx.body = await this.service.api.view(id);
  }

  async patch() {
    this.testLogin();

    const { id } = this.ctx.params;
    const { url, title, introduction, method, request, response, errs, useGlobalErrs } = this.ctx.request.body;

    const createRule = {
      url: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      method: {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      url,
      title,
      method,
    });

    const api = await this.service.api.patch(id, {
      url,
      title,
      introduction,
      method,
      request,
      response,
      errs,
      useGlobalErrs,
    });

    if (api) {
      this.ctx.body = api;
    } else {
      this.ctx.throw(422);
    }
  }

  async delete() {
    this.testLogin();

    const ids = this.ctx.params.id;
    if (!ids) return this.notFound();


    this.ctx.body = await this.service.api.delete(ids.split(','));
  }
}

module.exports = ApiController;
