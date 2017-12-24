'use strict';

module.exports = app => {
  app.router.prefix('/api');

  require('./router/system')(app);
  require('./router/user')(app);
  require('./router/project')(app);
  require('./router/api')(app);
};
