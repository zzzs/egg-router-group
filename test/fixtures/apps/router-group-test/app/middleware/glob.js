'use strict';

module.exports = () => {
  return async (ctx, next) => {
    ctx.set('h-global', 'h-global-value');
    return await next();
  };
};
