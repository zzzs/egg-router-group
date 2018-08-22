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

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, routerGroup')
      .expect(200);
  });
});
