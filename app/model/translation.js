'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TranslationSchema = new mongoose.Schema({
    index: {
      type: String,
      required: [ true, 'index_required' ],
      index: true,
      unique: true,
    },
    'zh-CN': {
      type: String,
      required: [ true, 'zh-CN_required' ],
    },
    'en-US': {
      type: String,
      required: [ true, 'en-US_required' ],
    },
    meta: {
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  });

  return mongoose.model('Translation', TranslationSchema);
};
