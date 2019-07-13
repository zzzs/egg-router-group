import { Router, Context } from 'egg';
import { IMiddleware } from 'koa-router'

interface RouterGroupOptions {
  name?: string;
  prefix?: string;
  middlewares?: IMiddleware<any, Context> | IMiddleware<any, Context>[];
}

type groupFunction = (router: RouterGroup) => void;

interface RouterGroup extends Router {
  group(options: RouterGroupOptions, cb: groupFunction | undefined = undefined): RouterGroup;
}

declare module 'egg' {
  interface Application {
    router: RouterGroup;
  }
}
