import { parse } from 'cookie';
import { Context } from 'egg';

// 这里是你自定义的中间件
export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const cookie = ctx.header.cookie && parse(ctx.header.cookie as string);
    if (cookie) {
      const { admin_id } = cookie;
      const admin = await ctx.service.adminUser.getAdminUserInfo({ _id: Number(admin_id) });
      if (
        admin && admin.role === 1
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

