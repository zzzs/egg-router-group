'use strict';

const is = require('is-type-of');
const assert = require('assert');

// except redirect, because be equal to all
// https://eggjs.org/zh-cn/basics/router.html
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];

class Router {
  constructor(app) {
    this.app = app;
  }

  /**
   * [路由群组操作]
   * @param  {Object} options  { name: 'aaa', prefix: '/pre', middlewares: [ m1, m2 ] } [群组属性]
   * @param  {Function} cb      [回调]
   * @return {undefined}           undefined
   */
  group(options, cb) {
    const name = options.name || '';
    const prefix = options.prefix || '';
    let middlewares = options.middlewares || [];
    // params validate
    if (!is.array(middlewares)) {
      assert(is.function(middlewares), `middlewares must be function or array, but got ${middlewares}`);
      middlewares = [ middlewares ];
    }
    assert(is.string(name), `name must be string, but got ${name}`);
    assert(is.string(prefix), `prefix must be string, but got ${prefix}`);
    assert(is.array(middlewares), `middlewares must be function or array, but got ${middlewares}`);

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    const proxy = new Proxy(this.app.router, {
      get(target, property) {
        const funcTarget = target[property];
        if (!methods.includes(property) || (name === '' && prefix === '' && middlewares.length === 0)) {
          return funcTarget;
        }

        return funcProxy(funcTarget, name, prefix, middlewares);
      },
    });

    cb(proxy);
  }
}

module.exports = Router;

/**
 * [router.verb Proxy]
 * @param  {Function}funcTarget  router.verb  路由方法
 * @param  {String} name        路由别名前缀
 * @param  {String} prefix      路由前缀
 * @param  {Function/Array} middlewares 中间件
 * @return {Object}             return router.verb Proxy
 */
function funcProxy(funcTarget, name, prefix, middlewares) {
  return new Proxy(funcTarget, {
    apply(target, ctx, args) {
      // egg-core\lib\utils\router.js#spliteAndResolveRouterParams()
      if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
        // app.get(name, url, [...middleware], controller)
        assert(is.string(args[0]), `router-name must be string, but got ${args[0]}`);
        assert(is.string(args[1]), `router-path must be string, but got ${args[1]}`);

        args[0] = joinPrefix(name, args[0]);
        args[1] = joinPrefix(prefix, args[1]);
        args.splice(2, 0, ...middlewares);
      } else {
        // app.get(url, [...middleware], controller)
        assert(is.string(args[0]), `router-path must be string, but got ${args[0]}`);
        args[0] = joinPrefix(prefix, args[0]);
        args.splice(1, 0, ...middlewares);
      }

      // return target.apply(ctx, args);
      // es6 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
      return Reflect.apply(target, ctx, args);
    },
  });
}

/**
 * [joinPrefix description]
 * @param  {[type]} prefix [description]
 * @param  {[type]} str    [description]
 * @return {[type]}        [description]
 */
function joinPrefix(prefix, str) {
  return prefix + str;
}
