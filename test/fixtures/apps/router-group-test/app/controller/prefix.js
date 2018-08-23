'use strict';

const Controller = require('egg').Controller;

class PrefixController extends Controller {
  async p1() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
  }

  async p2() {
    this.ctx.status = 200;
    this.ctx.set('h-qid', this.ctx.params.id);
    this.ctx.set('h-key', 'value');
  }
}

module.exports = PrefixController;
