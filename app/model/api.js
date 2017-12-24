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

  const ApiSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    request: {
      params: [KVSchema],
      queries: [KVSchema],
      headers: [KVSchema],
      cookies: [KVSchema],
      body: Object,
      useGlobal: {
        type: Boolean,
        default: true,
      },
    },
    response: {
      status: Number,
      body: Object,
      headers: [KVSchema],
      cookies: [KVSchema],
      useGlobal: {
        type: Boolean,
        default: true,
      },
    },
    useGlobalErrs: {
      type: Boolean,
      default: true,
    },
    errs: [],

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    meta: {
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  });

  return mongoose.model('Api', ApiSchema);
};
