'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.set('h-m1', 'h-m1-value');
    return await next();
  };
};
