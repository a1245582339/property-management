import { parse } from 'cookie';
import { Application, Context } from 'egg';

// 这里是你自定义的中间件
export default (app: Application) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const cookie = ctx.header.cookie && parse(ctx.header.cookie as string);
    if (cookie) {
      const { admin_id, admin_authorization_token } = cookie;
      const redisToken = await app.redis.get(`admin_user_${admin_id}_token`);
      if (
        admin_authorization_token &&
        admin_id &&
        redisToken &&
        admin_authorization_token === redisToken
      ) {
        await next();
      } else {
        ctx.status = 401;
      }
    } else {
      ctx.status = 401;
    }
  };
};

