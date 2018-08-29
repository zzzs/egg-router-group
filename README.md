# egg-router-group

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-router-group.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-router-group
[travis-image]: https://img.shields.io/travis/zzzs/egg-router-group.svg?style=flat-square
[travis-url]: https://travis-ci.org/zzzs/egg-router-group
[codecov-image]: https://img.shields.io/codecov/c/github/zzzs/egg-router-group.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zzzs/egg-router-group?branch=master
[david-image]: https://img.shields.io/david/zzzs/egg-router-group.svg?style=flat-square
[david-url]: https://david-dm.org/zzzs/egg-router-group
[snyk-image]: https://snyk.io/test/github/zzzs/egg-router-group/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/zzzs/egg-router-group?targetFile=package.json
[download-image]: https://img.shields.io/npm/dm/egg-router-group.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-router-group

have the ability to route group operations for eggjs.

赋予eggjs路由群组操作的能力。


## Install

```bash
$ npm i egg-router-group --save
```

## Mount

```js
// {app_root}/config/plugin.js
exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
};
```

## Features
> 为 app.router 注入了路由群组 group(options, cb) 方法, options: 路由群组公用属性, cb: 路由回调。

路由群组允许你共用路由属性，例如：路由别名前缀，路由url前缀，中间件等，你可以利用路由群组统一为多个路由设置共同属性，而不需在每个路由上都设置一次。共用属性被指定为对象格式，当作 app.router.group 方法的第一个参数，具体路由群组的相关内容，可参考下面几个常用样例来熟悉这些特性。

**目前支持这三种属性**

  * 路由别名前缀: name
  * 路由url前缀: prefix
  * 中间件: middlewares

## Usage

### 基本用法

```js
// {app_root}/app/router.js
module.exports = app => {
  const { router, controller, middleware } = app;
  const m1 = middleware.m1();
  const m2 = middleware.m2({ key: 'value' });
  const m3 = middleware.m3();

  router.group({ name: 'home::', prefix: '/pre', middlewares: [ m1, m2 ] }, router => {
    // router-path: /pre/test, middlewares: m1, m2
    router.get('/get', controller.home.get);
    // router-name: home::post, router-path: /pre/post, middlewares: m1, m2, m3
    router.post('post', '/post', m3, controller.home.post);
    
    // others
    router.all('/test', controller.home.all1);
    router.all('testname', '/test2', controller.home.all2);
    router.put('/put', controller.home.put);
    router.delete('/delete', controller.home.delete);
    router.del('/del', controller.home.del);
    router.options('/options', controller.home.options);
    router.patch('/patch', controller.home.patch);
    router.redirect('/redirect', '/');
    router.redirect('/redirect2', 'home::testname', 302);
  });

  // 设置单个属性
  router.group({ name: 'home::' }, router => {
    // router-path: /test
    router.get('/get', controller.home.get);
    // router-name: home::post, router-path: /post
    router.post('post', '/post', controller.home.post);
  });
};
```

### 中间件

> 支持传单个中间件或数组的形式

```js
// {app_root}/app/router.js
module.exports = app => {
  const { router, controller, middleware } = app;
  const m1 = middleware.m1();
  const m2 = middleware.m2({ key: 'value' });

  router.group({ middlewares: [ m1, m2 ] }, router => {
    router.get('/test_m1', controller.home.test_m1);
    router.post('/test_m2/:id', controller.home.test_m2);
  });
  router.group({ middlewares: m1 }, router => {
    router.get('/test_m3', controller.home.test_m3);
    router.post('/test_m4/:id', controller.home.test_m4);
  });
};
```

### 路由别名前缀 & 路由url前缀
> 路由别名前缀 & 路由url前缀 只支持string类型

```js
// {app_root}/app/router.js
module.exports = app => {
  // name
  router.group({ name: 'home::' }, router => {
    // router-name: home::post
    router.post('post', '/test/:id', controller.home.t1);
  });

  // prefix
  router.group({ prefix: '/pre' }, router => {
    // router-name: test, router-path: /pre/test2
    router.get('test', '/test2', controller.home.t2);
  });
};
```

### Advanced Usage
> 路由子群组，顾名思义，即路由群组内也可以使用路由群组功能，很适用于大型项目，当路由到达一定量级时，也能轻松维护管理。如果你想的话，路由群组可以一直嵌套下去。


**注：如果出现设置重复的中间件，该中间件也会被执行多次，这部分自由度还是会开放给用户，不做特殊处理。**

```js

  // {app_root}/app/router.js
  router.group({ name: 'home1::', prefix: '/pre1', middlewares: m1 }, router => {
    // router-name: home1::name_g1, router-path: /pre1/test_g1, middlewares: m1, m2
    router.get('name_g1', '/test_g1', m2, controller.group.g1);

    router.group({ prefix: '/pre2', middlewares: m2 }, router => {
      // router-path: /pre1/pre2/test_g3, middlewares: m1, m2, m2
      router.get('/test_g3', m2, controller.group.g1);

      // router-path: /pre1/pre2/test_g4/:id, middlewares: m1, m2
      router.post('/test_g4/:id', controller.group.g2);

      router.group({ name: 'home2::' }, router => {
        // router-name: home1::home2::name_g1 router-path: /pre1/pre2/test_g6/:id, middlewares: m1, m2
        router.post('name_g6', '/test_g6/:id', controller.group.g2);
        // ...
      });
    });
  });
```

## Questions & Suggestions

Please open an issue [here](https://github.com/zzzs/egg-router-group/issues).

## License

[MIT](LICENSE)
