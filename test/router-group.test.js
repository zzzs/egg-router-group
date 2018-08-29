'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/router-group.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/router-group-test',
    });
    return app.ready();
  });

  beforeEach(() => app.mockCsrf());
  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, routerGroup')
      .expect(200);
  });

  describe('case: exception', () => {
    it('name must be string', () => {
      try {
        app.router.group({ name: /^test\/.*/, prefix: '/pre', middlewares: [] }, router => {
          router.get('/test', app.controller.home.all1);
        });
        throw 'another exception';
      } catch (err) {
        assert(err.message.includes('name must be string, but got'));
      }
    });

    it('prefix must be string', () => {
      try {
        app.router.group({ name: 'home::', prefix: /^test\/.*/, middlewares: [] }, router => {
          router.get('/test', app.controller.home.all1);
        });
        throw 'another exception';
      } catch (err) {
        assert(err.message.includes('prefix must be string, but got'));
      }
    });

    it('middlewares must be function or array', () => {
      try {
        app.router.group({ name: 'home::', prefix: '/pre', middlewares: 'hhh' }, router => {
          router.get('/test', app.controller.home.all1);
        });
        throw 'another exception';
      } catch (err) {
        assert(err.message.includes('middlewares must be function or array, but got'));
      }
    });

    it('router-name must be string', () => {
      try {
        app.router.group({ name: 'home::', prefix: '/pre' }, router => {
          router.get(/^test\/.*/, '/test', app.controller.home.all1);
        });
        throw 'another exception';
      } catch (err) {
        assert(err.message.includes('router-name must be string, but got'));
      }
    });

    it('router-path must be string', () => {
      try {
        app.router.group({ name: 'home::', prefix: '/pre' }, router => {
          router.get('home::', /^test\/.*/, app.controller.home.all1);
        });
        throw 'another exception';
      } catch (err) {
        assert(err.message.includes('router-path must be string, but got'));
      }
    });
  });

  describe('case: all', () => {
    it('should GET /pre/test', () => {
      return app.httpRequest()
        .get('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-global', 'h-global-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre/test', () => {
      return app.httpRequest()
        .post('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-global', 'h-global-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should PUT /pre/test', () => {
      return app.httpRequest()
        .put('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-global', 'h-global-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should DELETE /pre/test', () => {
      return app.httpRequest()
        .delete('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-global', 'h-global-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should GET /pre/test2', () => {
      return app.httpRequest()
        .get('/pre/test2')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-path', '/pre/test2?bar=foo')
        .expect(200);
    });

    it('should POST /pre/test2', () => {
      return app.httpRequest()
        .post('/pre/test2')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-path', '/pre/test2?bar=foo')
        .expect(200);
    });

    it('should PUT /pre/test2', () => {
      return app.httpRequest()
        .put('/pre/test2')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-path', '/pre/test2?bar=foo')
        .expect(200);
    });

    it('should DELETE /pre/test2', () => {
      return app.httpRequest()
        .delete('/pre/test2')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-path', '/pre/test2?bar=foo')
        .expect(200);
    });

    it('should GET /pre/get', () => {
      return app.httpRequest()
        .get('/pre/get')
        .expect('h-m1', 'h-m1-value')
        .expect('body: get')
        .expect(200);
    });

    it('should POST /pre/post', () => {
      return app.httpRequest()
        .post('/pre/post')
        .expect('h-m1', 'h-m1-value')
        .expect('body: post')
        .expect(200);
    });

    it('should PUT /pre/put', () => {
      return app.httpRequest()
        .put('/pre/put')
        .expect('h-m1', 'h-m1-value')
        .expect('body: put')
        .expect(200);
    });

    it('should DELETE /pre/delete', () => {
      return app.httpRequest()
        .delete('/pre/delete')
        .expect('h-m1', 'h-m1-value')
        .expect('body: delete')
        .expect(200);
    });

    it('should DEL /pre/del', () => {
      return app.httpRequest()
        .del('/pre/del')
        .expect('h-m1', 'h-m1-value')
        .expect('body: del')
        .expect(200);
    });

    it('should OPTIONS /pre/options', () => {
      return app.httpRequest()
        .options('/pre/options')
        .expect('h-m1', 'h-m1-value')
        .expect('body: options')
        .expect(200);
    });

    it('should PATCH /pre/patch', () => {
      return app.httpRequest()
        .patch('/pre/patch')
        .expect('h-m1', 'h-m1-value')
        .expect('body: patch')
        .expect(200);
    });

    it('should REDIRECT /pre/redirect', () => {
      return app.httpRequest()
        .get('/pre/redirect')
        .expect(301)
        .expect('location', '/');
    });

    it('should REDIRECT /pre/redirect2 to router-name', () => {
      return app.httpRequest()
        .get('/pre/redirect2')
        .expect(302)
        .expect('location', '/pre/test2');
    });
  });

  describe('case: resource', () => {
    it('should GET /pre/api/posts', () => {
      return app.httpRequest()
        .get('/pre/api/posts')
        .expect('h-path', '/pre/api/posts?bar=foo')
        .expect('h-m1', 'h-m1-value')
        .expect('post index')
        .expect(200);
    });

    it('should GET /pre/api/posts/new', () => {
      return app.httpRequest()
        .get('/pre/api/posts/new')
        .expect('h-path', '/pre/api/posts/new?bar=foo')
        .expect('h-m1', 'h-m1-value')
        .expect('post new')
        .expect(200);
    });

    it('should GET /pre/api/posts/1', () => {
      return app.httpRequest()
        .get('/pre/api/posts/1')
        .expect('h-path', '/pre/api/posts/:id?bar=foo')
        .expect('h-m1', 'h-m1-value')
        .expect('post show 1')
        .expect(200);
    });

    it('should GET /pre/api/posts/1/edit', () => {
      return app.httpRequest()
        .get('/pre/api/posts/1/edit')
        .expect('h-path', '/pre/api/posts/:id/edit?bar=foo')
        .expect('h-m1', 'h-m1-value')
        .expect('post edit 1')
        .expect(200);
    });

    it('should POST /pre/api/posts', () => {
      return app.httpRequest()
        .post('/pre/api/posts')
        .expect('h-m1', 'h-m1-value')
        .expect('post create')
        .expect(200);
    });

    it('should PUT /pre/api/posts/1', () => {
      return app.httpRequest()
        .put('/pre/api/posts/1')
        .expect('h-m1', 'h-m1-value')
        .expect('post update 1')
        .expect(200);
    });

    it('should DELETE /pre/api/posts/1', () => {
      return app.httpRequest()
        .delete('/pre/api/posts/1')
        .expect('h-m1', 'h-m1-value')
        .expect('post destroy 1')
        .expect(200);
    });
  });

  describe('case: name', () => {
    it('should GET /test_n1', () => {
      return app.httpRequest()
        .get('/test_n1')
        .expect('h-path', '/test_n1?bar=foo')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should GET /test_n1', () => {
      return app.httpRequest()
        .get('/test_n1')
        .expect('h-path', '/test_n1?bar=foo')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /test_m2', () => {
      return app.httpRequest()
        .post('/test_n2/123')
        .expect('h-path', '/test_n2/:id?bar=foo')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });
  });

  describe('case: prefix', () => {
    it('should GET /pre/test_p1', () => {
      return app.httpRequest()
        .get('/pre/test_p1')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre/test_m2', () => {
      return app.httpRequest()
        .post('/pre/test_p2/123')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });
  });

  describe('case: middlename', () => {
    it('should GET /test_m1', () => {
      return app.httpRequest()
        .get('/test_m1')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /test_m2', () => {
      return app.httpRequest()
        .post('/test_m2/123')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });

    it('should GET /test_m3', () => {
      return app.httpRequest()
        .get('/test_m3')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /test_m4', () => {
      return app.httpRequest()
        .post('/test_m4/123')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });
  });

  describe('case: group', () => {
    it('should GET /pre1/test_g1', () => {
      return app.httpRequest()
        .get('/pre1/test_g1')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect('h-path', '/pre1/test_g1?bar=foo')
        .expect(200);
    });

    it('should POST /pre1/test_g2', () => {
      return app.httpRequest()
        .post('/pre1/test_g2/123')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });

    it('should GET /pre1/pre2/test_g3', () => {
      return app.httpRequest()
        .get('/pre1/pre2/test_g3')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre1/pre2/test_g4', () => {
      return app.httpRequest()
        .post('/pre1/pre2/test_g4/123')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect(200);
    });

    it('should GET /pre1/pre2/test_g5', () => {
      return app.httpRequest()
        .get('/pre1/pre2/test_g5')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre1/pre2/test_g6', () => {
      return app.httpRequest()
        .post('/pre1/pre2/test_g6/123')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect('h-qid', '123')
        .expect('h-path', '/pre1/pre2/test_g6/:id?bar=foo')
        .expect(200);
    });

    it('should POST /pre1/pre2/test_g7', () => {
      return app.httpRequest()
        .get('/pre1/pre2/test_g7')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre1/pre2/test_g8', () => {
      return app.httpRequest()
        .get('/pre1/pre2/test_g8')
        .expect('h-m1', 'h-m1-value')
        .expect('h-m2', 'h-m2-value')
        .expect('h-key', 'value')
        .expect(200);
    });
  });

});
