'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const m1 = middleware.m1();
  const m2 = middleware.m2({ value: 'h-m2-value' });

  router.get('/', controller.home.index);

  // all
  router.group({ name: 'home::', prefix: '/pre', middlewares: m1 }, router => {
    router.all('/test', controller.home.all1);
    router.all('testname', '/test2', controller.home.all2);
    router.get('/get', controller.home.get);
    router.post('/post', controller.home.post);
    router.put('/put', controller.home.put);
    router.delete('/delete', controller.home.delete);
    router.del('/del', controller.home.del);
    router.options('/options', controller.home.options);
    router.patch('/patch', controller.home.patch);
    router.redirect('/redirect', '/');
    router.redirect('/redirect2', 'home::testname', 302);
  });

  // resources
  // https://eggjs.org/zh-cn/basics/router.html
  router.group({ name: 'home::', prefix: '/pre', middlewares: m1 }, router => {
    router.resources('posts', '/api/posts', controller.posts);
  });

  // name
  router.group({ name: 'home::' }, router => {
    router.get('test_n1', '/test_n1', controller.name.n1);
    router.post('test_n2', '/test_n2/:id', controller.name.n2);
  });

  // prefix
  router.group({ prefix: '/pre' }, router => {
    router.get('test_p1', '/test_p1', controller.prefix.p1);
    router.post('test_p2', '/test_p2/:id', controller.prefix.p2);
  });

  // middlewares
  router.group({ middlewares: [ m1, m2 ] }, router => {
    router.get('/test_m1', controller.middlew.m1);
    router.post('/test_m2/:id', controller.middlew.m2);
  });
  router.group({ middlewares: m1 }, router => {
    router.get('/test_m3', controller.middlew.m1);
    router.post('/test_m4/:id', controller.middlew.m2);
  });

};
