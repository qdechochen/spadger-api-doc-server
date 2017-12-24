'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    avatar: {
      type: String,
      default: '/upload/avatar/default.png',
    },
    email: String,

    deleted: {
      type: Boolean,
      default: false,
    },
    flags: {
      mobile_verified: {
        type: Boolean,
        default: false,
      },
      email_verified: {
        type: Boolean,
        default: false,
      },
    },
    meta: {
      created_at: {
        type: Date,
        default: Date.now,
      },
      last_login_date: {
        type: Date,
        default: null,
      },
    },
  });

  return mongoose.model('User', UserSchema);
};
