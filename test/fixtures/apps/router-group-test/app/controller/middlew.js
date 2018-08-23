'use strict';

const Controller = require('egg').Controller;

class MiddlewController extends Controller {
  async m1() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
  }

  async m2() {
    this.ctx.status = 200;
    this.ctx.set('h-qid', this.ctx.params.id);
    this.ctx.set('h-key', 'value');
  }
}

module.exports = MiddlewController;
