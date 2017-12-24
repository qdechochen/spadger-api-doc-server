'use strict';

const BaseService = require('./base');

const DEFAULT_PAGE_SIZE = 10;

class TranslationService extends BaseService {
  async search({ keyword, sort, page = 1, pageSize = DEFAULT_PAGE_SIZE }) {
    const filter = {};
    if (keyword) {
      filter.$or = [{
        index: new RegExp(keyword, 'gi'),
      }, {
        'zh-CN': new RegExp(keyword, 'gi'),
      }, {
        'en-US': new RegExp(keyword, 'gi'),
      }];
    }

    const total = await this.ctx.model.Translation.count(filter);
    page = this.fixPage(page, this.getTotalPage(total, pageSize));

    const query = this.ctx.model.Translation.find(filter)
      .select('index zh-CN en-US meta');
    if (sort) query.sort(sort);
    if (page > 1) query.skip((page - 1) * pageSize);
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
    return await this.ctx.model.Translation.findById(id).lean();
  }

  async viewByIndex(index) {
    return await this.ctx.model.Translation.findOne({
      index,
    }).lean();
  }

  async create(data) {
    const translation = new this.ctx.model.Translation(data);
    await translation.save();
    return translation._id;
  }

  async patch(id, data) {
    return await this.ctx.model.Translation.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(ids) {
    const result = await this.ctx.model.Translation.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return {
      deleted: result.deletedCount,
    };
  }
}

module.exports = TranslationService;
