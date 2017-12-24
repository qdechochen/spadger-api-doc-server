'use strict';

const BaseService = require('./base');

const DEFAULT_PAGE_SIZE = 10;

class ApiService extends BaseService {
  async search({ project, keyword, select, sort, page = 1, pageSize = DEFAULT_PAGE_SIZE }) {
    const filter = {};
    if (project) {
      filter.project = project;
    }
    if (keyword) {
      filter.$or = [{
        name: new RegExp(keyword, 'gi'),
      }, {
        description: new RegExp(keyword, 'gi'),
      }];
    }

    const total = await this.ctx.model.Api.count(filter);
    page = this.fixPage(page, this.getTotalPage(total, pageSize));

    const query = this.ctx.model.Api.find(filter);
    if (select) {
      query.select(select);
    }
    if (sort) query.sort(sort);
    if (page > 1) query.skip((page - 1) * pageSize);
    if (!select || select.includes('creator')) {
      query.populate({
        path: 'creator',
        select: 'name title avatar',
      });
    }
    const list = await query.limit(pageSize);

    return {
      list,
      pagination: {
        total,
        page,
      },
    };
  }

  async view(id) {
    return await this.ctx.model.Api.findById(id)
      .populate({
        path: 'creator',
        select: 'name avatar',
      })
      .populate({
        path: 'project',
        select: 'apiRoot request response errs useGlobalErrs',
      })
      .lean();
  }

  async create(data) {
    const Project = new this.ctx.model.Api(data);
    await Project.save();
    return Project._id;
  }

  async patch(id, data) {
    return await this.ctx.model.Api.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(ids) {
    const result = await this.ctx.model.Api.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return {
      deleted: result.deletedCount,
    };
  }
}

module.exports = ApiService;
