'use strict';

const BaseService = require('./base');

const DEFAULT_PAGE_SIZE = 10;

class ProjectService extends BaseService {
  async search({ keyword, select, sort, page = 1, pageSize = DEFAULT_PAGE_SIZE }) {
    const filter = {};
    if (keyword) {
      filter.$or = [{
        name: new RegExp(keyword, 'gi'),
      }, {
        description: new RegExp(keyword, 'gi'),
      }];
    }

    const total = await this.ctx.model.Project.count(filter);
    page = this.fixPage(page, this.getTotalPage(total, pageSize));

    const query = this.ctx.model.Project.find(filter);
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
    return await this.ctx.model.Project.findById(id)
      .populate({
        path: 'creator',
        select: 'name avatar',
      }).lean();
  }

  async create(data) {
    const Project = new this.ctx.model.Project(data);
    await Project.save();
    return Project._id;
  }

  async patch(id, data) {
    return await this.ctx.model.Project.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(ids) {
    const result = await this.ctx.model.Project.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return {
      deleted: result.deletedCount,
    };
  }
}

module.exports = ProjectService;
