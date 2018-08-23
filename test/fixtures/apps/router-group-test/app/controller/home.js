'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.routerGroup.name;
  }

  async all1() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
  }

  async all2() {
    this.ctx.status = 200;
    this.ctx.set('h-key', 'value');
    let path = this.ctx.helper.pathFor('home::testname', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }
}

module.exports = HomeController;
