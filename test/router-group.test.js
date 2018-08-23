'use strict';

const mock = require('egg-mock');

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

  describe('case:all', () => {
    it('should GET /pre/test', () => {
      return app.httpRequest()
        .get('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should POST /pre/test', () => {
      return app.httpRequest()
        .post('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should PUT /pre/test', () => {
      return app.httpRequest()
        .put('/pre/test')
        .expect('h-m1', 'h-m1-value')
        .expect('h-key', 'value')
        .expect(200);
    });

    it('should DELETE /pre/test', () => {
      return app.httpRequest()
        .delete('/pre/test')
        .expect('h-m1', 'h-m1-value')
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
  });

  // describe('case:prefix', () => {
  //   it('should GET /test_p1', () => {
  //     return app.httpRequest()
  //       .get('/test_p1')
  //       .expect('h-m1', 'h-m1-value')
  //       .expect('h-m2', 'h-m2-value')
  //       .expect('h-key', 'value')
  //       .expect(200);
  //   });

  //   it('should POST /test_m2', () => {
  //     return app.httpRequest()
  //       .post('/test_m2')
  //       .expect('h-m1', 'h-m1-value')
  //       .expect('h-m2', 'h-m2-value')
  //       .expect('h-key', 'value')
  //       .expect(200);
  //   });

  //   it('should GET /test_m3', () => {
  //     return app.httpRequest()
  //       .get('/test_m3')
  //       .expect('h-m1', 'h-m1-value')
  //       .expect('h-key', 'value')
  //       .expect(200);
  //   });

  //   it('should POST /test_m4', () => {
  //     return app.httpRequest()
  //       .post('/test_m4')
  //       .expect('h-m1', 'h-m1-value')
  //       .expect('h-key', 'value')
  //       .expect(200);
  //   });
  // });

  describe('case:middlename', () => {
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


});
