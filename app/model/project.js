'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const KVSchema = new mongoose.Schema({
    key: String,
    type: String,
    description: String,
  }, {
    _id: false,
  });

  const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    apiRoot: {
      type: String,
      default: '/',
    },
    request: {
      queries: [KVSchema],
      body: Object,
      headers: [KVSchema],
      cookies: [KVSchema],
    },
    response: {
      headers: [KVSchema],
      cookies: [KVSchema],
    },
    errs: [],

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    meta: {
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  });

  return mongoose.model('Project', ProjectSchema);
};
