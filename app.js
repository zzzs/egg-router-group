'use strict';
const Router = require('./lib/index');

module.exports = app => {
  const router = new Router(app);

  /**
   * 路由群组操作
   * @param  {Object} options { name: 'aaa', prefix: '/pre', middlewares: [ m1, m2 ] } [群组属性]
   * @param  {Function} cb      [回调]
   * @return {undefined}           [undefined]
   */
  app.router.group = (options, cb) => {
    return router.group(options, cb);
  };
};
