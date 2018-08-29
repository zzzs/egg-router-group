'use strict';

const Controller = require('egg').Controller;

class GroupController extends Controller {
  async g1() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
    const path = this.ctx.helper.pathFor('home1::name_g1', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }

  async g2() {
    this.ctx.status = 200;
    this.ctx.set('h-qid', this.ctx.params.id);
    this.ctx.set('h-key', 'value');
    const path = this.ctx.helper.pathFor('home1::home2::name_g6', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }
}

module.exports = GroupController;
