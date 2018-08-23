'use strict';

const Controller = require('egg').Controller;

class ResourcesController extends Controller {
  async index() {
    this.ctx.body = 'post index';
    let path = this.ctx.helper.pathFor('home::posts', { bar: 'foo' });
    this.ctx.set('h-path', path);
  }

  async new() {
    let path = this.ctx.helper.pathFor('new_home::post', { bar: 'foo' });
    this.ctx.set('h-path', path);
    this.ctx.body = 'post new';
  }

  async show() {
    let path = this.ctx.helper.pathFor('home::post', { bar: 'foo' });
    this.ctx.set('h-path', path);
    this.ctx.body =  `post show ${this.ctx.params.id}`;
  }

  async edit() {
    let path = this.ctx.helper.pathFor('edit_home::post', { bar: 'foo' });
    this.ctx.set('h-path', path);
    this.ctx.body = `post edit ${this.ctx.params.id}`;
  }

  async create() {
    this.ctx.body = 'post create';
  }

  async update() {
    this.ctx.body = `post update ${this.ctx.params.id}`;
  }

  async destroy() {
    this.ctx.body = `post destroy ${this.ctx.params.id}`;
  }
}

module.exports = ResourcesController;
