'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const m1 = middleware.m1();
  const m2 = middleware.m2({value: 'h-m2-value'});

  router.get('/', controller.home.index);

  // all
  router.group({name: 'home::', prefix: '/pre', middlewares: m1}, router => {
      router.all('/test', controller.home.all1);
      router.all('testname', '/test2', controller.home.all2);
  });

  // middlewares
  router.group({middlewares: [m1, m2]}, router => {
      router.get('/test_m1', controller.middlew.m1);
      router.post('/test_m2/:id', controller.middlew.m2);
  });
  router.group({middlewares: m1}, router => {
      router.get('/test_m3', controller.middlew.m1);
      router.post('/test_m4/:id', controller.middlew.m2);
  });

};
