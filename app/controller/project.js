'use strict';

const BaseController = require('./base');

class ProjectController extends BaseController {
  async index() {
    this.testLogin();

    const { keyword, sort, page, pageSize } = this.ctx.query;
    let select = this.ctx.query.select;
    if (select === 'full') {
      select = null;
    } else {
      select = 'name';
    }
    this.ctx.body = await this.service.project.search({
      keyword,
      select,
      sort,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  }

  async create() {
    this.testLogin();

    const { name, introduction, request, response, errs } = this.ctx.request.body;

    const createRule = {
      name: {
        type: 'string',
      },
      introduction: {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      name,
      introduction,
    });

    this.ctx.body = {
      _id: await this.service.project.create({
        name,
        introduction,
        request,
        response,
        errs,
        creator: this.ctx.session.user,
      }),
    };
  }

  async view() {
    this.testLogin();

    const id = this.ctx.params.id;
    this.ctx.body = await this.service.project.view(id);
  }

  async patch() {
    this.testLogin();

    const { id } = this.ctx.params;
    const { name, introduction, apiRoot, request, response, errs } = this.ctx.request.body;

    const createRule = {
      name: {
        type: 'string',
      },
      introduction: {
        type: 'string',
      },
      apiRoot: {
        type: 'string',
      },
    };

    this.ctx.validate(createRule, {
      name,
      introduction,
      apiRoot,
    });

    const Project = await this.service.project.patch(id, {
      name,
      introduction,
      apiRoot,
      request,
      response,
      errs,
    });
    if (Project) {
      this.ctx.body = Project;
    } else {
      this.ctx.throw(422);
    }
  }

  async delete() {
    this.testLogin();

    const ids = this.ctx.params.id;
    if (!ids) return this.notFound();


    this.ctx.body = await this.service.Project.delete(ids.split(','));
  }

  async searchApis() {
    this.testLogin();

    const { keyword, sort, page, pageSize } = this.ctx.query;
    const { project } = this.ctx.params;
    let select = this.ctx.query.select;
    if (select === 'full') {
      select = null;
    } else {
      select = 'url method';
    }
    this.ctx.body = await this.service.api.search({
      project,
      keyword,
      select,
      sort,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  }
}

module.exports = ProjectController;
