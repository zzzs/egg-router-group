'use strict';

const Controller = require('egg').Controller;

class NameController extends Controller {
  async n1() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
    const path = this.ctx.helper.pathFor('home::test_n1', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }

  async n2() {
    this.ctx.status = 200;
    this.ctx.set('h-qid', this.ctx.params.id);
    this.ctx.set('h-key', 'value');
    const path = this.ctx.helper.pathFor('home::test_n2', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }
}

module.exports = NameController;
