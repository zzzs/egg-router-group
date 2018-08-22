'use strict';

const is = require('is-type-of');
const assert = require('assert');

// except redirect
// https://eggjs.org/zh-cn/basics/router.html
const methods = [ 'head', 'options', 'get', 'put', 'patch', 'post', 'delete', 'del', 'all', 'resources' ];

class Router {
  constructor(app) {
    this.app = app;
  }

  /**
   * [router-group 路由群组操作]
   * @param  {[type]}   options [description]
   * @param  {Function} cb      [description]
   * @return {[type]}           [description]
   */
  group (options, cb) {
    const name = options.name ? options.name : '';
    const prefix = options.prefix ? options.prefix : '';
    const middlewares = options.middlewares ? options.middlewares : [];
    // params validate
    if (!is.array(options.middlewares)) {
      assert(is.function(middlewares), `only support middlewares with function or array, but got ${middlewares}`);
      middlewares = [middlewares];
    }
    assert(is.string(name), `only support name with string, but got ${name}`);
    assert(is.string(prefix), `only support prefix with string, but got ${prefix}`);
    assert(is.array(middlewares), `only support middlewares with function or array, but got ${middlewares}`);

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    const proxy = new Proxy(this.app.router, {
      get(target, property) {
        const funcTarget = target[property];
        if (!methods.includes(property)) {
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
 * [funcProxy description]
 * @param  {[type]} funcTarget  [description]
 * @param  {[type]} name        [description]
 * @param  {[type]} prefix      [description]
 * @param  {[type]} middlewares [description]
 * @return {[type]}             [description]
 */
function funcProxy (funcTarget, name, prefix, middlewares) {
  return new Proxy(funcTarget, {
    apply(target, ctx, args) {
      // egg-core\lib\utils\router.js#spliteAndResolveRouterParams()
      if (args.length >= 3 && (is.string(args[1]) || is.regExp(args[1]))) {
        // app.get(name, url, [...middleware], controller)
        assert(is.string(args[0]), `only support router-name with string, but got ${args[0]}`);
        assert(is.string(args[1]), `only support router-path with string, but got ${args[1]}`);

        args[0] = joinPrefix(name, args[0]);
        args[1] = joinPrefix(prefix, args[1]);
        args.splice(2, 0, ...middlewares);
      } else {
        // app.get(url, [...middleware], controller)
        assert(is.string(args[0]), `only support router-path with string, but got ${args[0]}`);
        args[0] = joinPrefix(prefix, args[0]);
        args.splice(1, 0, ...middlewares);
      }

      // return target.apply(ctx, args);
      // es6 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
      return Reflect.apply(target, ctx, args);
    }
  });
};

/**
 * [joinPrefix description]
 * @param  {[type]} prefix [description]
 * @param  {[type]} str    [description]
 * @return {[type]}        [description]
 */
function joinPrefix (prefix, str) {
  return prefix + str;
};
