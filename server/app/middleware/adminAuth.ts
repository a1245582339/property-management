import { Application, Context } from 'egg';

// 这里是你自定义的中间件
export default function fooMiddleware(app: Application): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const _id = ctx.cookies.get('user_id');
    const token = ctx.cookies.get('authorization_token');
    const redisToken = await app.redis.get(`admin_user_${_id}_token`);
    if (token === redisToken) {
      await next();
    } else {
      ctx.status = 401;
    }
  };
}
