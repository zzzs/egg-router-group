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
    const path = this.ctx.helper.pathFor('home::testname', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }

  async get() {
    this.ctx.status = 200;
    this.ctx.body = 'body: get';
  }
  async post() {
    this.ctx.status = 200;
    this.ctx.body = 'body: post';
  }
  async put() {
    this.ctx.status = 200;
    this.ctx.body = 'body: put';
  }
  async del() {
    this.ctx.status = 200;
    this.ctx.body = 'body: del';
  }
  async delete() {
    this.ctx.status = 200;
    this.ctx.body = 'body: delete';
  }
  async options() {
    this.ctx.status = 200;
    this.ctx.body = 'body: options';
  }
  async patch() {
    this.ctx.status = 200;
    this.ctx.body = 'body: patch';
  }
}

module.exports = HomeController;
