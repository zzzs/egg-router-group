'use strict';
const Router = require('./lib/index');

module.exports = app => {
  const router = new Router(app);

  app.router.group = (options, cb) => {
    return router.group(options, cb);
  };
}
