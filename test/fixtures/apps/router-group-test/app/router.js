'use strict';

module.exports = app => {
  const { router, controller } = app;
  const m1 = middleware.m1();
  const m2 = middleware.m2();

  router.get('/', controller.home.index);

  // all
  const allRouter = app.router.group(['name' => 'home::', 'prefix' => '/pre', 'middleware' => [m1, m2]], router => {
      router.all('/test', controller.home.all);
  });
};
