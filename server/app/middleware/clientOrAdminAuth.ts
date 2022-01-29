import { parse } from 'cookie';
import { Application, Context } from 'egg';

export default (app: Application) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const cookie = ctx.header.cookie && parse(ctx.header.cookie as string);
    if (cookie) {
      const {
        client_id,
        client_authorization_token,
        admin_id,
        admin_authorization_token,
      } = cookie;
      const clientRedisToken = await app.redis.get(
        `client_user_${client_id}_token`,
      );
      const adminRedisToken = await app.redis.get(
        `admin_user_${admin_id}_token`,
      );
      if (
        client_authorization_token &&
        client_id &&
        clientRedisToken &&
        client_authorization_token === clientRedisToken
      ) {
        await next();
      } else if (
        admin_authorization_token &&
        admin_id &&
        adminRedisToken &&
        admin_authorization_token === adminRedisToken
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
