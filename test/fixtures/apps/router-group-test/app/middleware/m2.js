'use strict';

module.exports = options => {
  return async (ctx, next) => {
    ctx.set('h-m2', options.value);
    return await next();
  };
};
