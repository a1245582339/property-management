import { Controller } from 'egg';
import { parse } from 'cookie';
export default class AdminUser extends Controller {
  public async login() {
    const { ctx } = this;
    const { password = '', email = '' } = ctx.request.body; // 获取请求的密码与邮箱
    const res = await ctx.service.adminUser.genarateToken({ password, email }); // 获取service中生存的token
    if (res._id) { // 如果查询到了结果
      ctx.cookies.set(`admin_id=${res._id};path=/;max-age=604800;HTTPOnly;`); // 将管理员id设置入cookie
      ctx.cookies.set(
        `admin_authorization_token=${res.token};path=/;max-age=604800;HTTPOnly;`,
      ); // 将token设置入cookie
      this.app.redis.set(`admin_user_${res._id}_token`, res.token!); // 将cookie保存入redis
      ctx.body = {
        code: 0, // 登录成功
      };
    } else { // 如果没查询到结果
      ctx.body = {
        code: 4, // 邮箱或密码错误，通过状态码通知前端
      };
    }
  }
  public async logout() {
    const cookie = parse(this.ctx.header.cookie as string);
    this.app.redis.del(`admin_user_${cookie.admin_id}_token`);
    this.ctx.body = { code: 0 };
  }
  public async adminUserInfo() {
    const { ctx } = this;
    const _id = parse(ctx.header.cookie as string).admin_id;
    const res = await ctx.service.adminUser.getAdminUserInfo({
      _id: Number(_id),
    });
    if (res) {
      ctx.body = {
        code: 0,
        data: res,
      };
    } else {
      ctx.body = {
        code: 5,
        msg: 'USER NOT EXIST',
      };
    }
  }
  public async adminUserList() {
    const { ctx } = this;
    const { name = '', page = 0 } = ctx.query;
    const res = await ctx.service.adminUser.getAdminUserList({
      name,
      page: Number(page),
    });
    if (res) {
      ctx.body = {
        code: 0,
        data: res,
      };
    } else {
      ctx.body = {
        code: 5,
        msg: 'USER NOT EXIST',
      };
    }
  }
  public async createAdminUser() {
    const { name, email, role } = this.ctx.request.body;
    const res = await this.ctx.service.adminUser.createAdminUser({
      name,
      email,
      role,
    });
    this.ctx.body = res;
  }
  public async deleteAdminUser() {
    const { _id } = this.ctx.request.query;
    const res = await this.ctx.service.adminUser.deleteAdminUser({
      _id: Number(_id),
    });
    this.app.redis.del(`admin_user_${_id}_token`);
    this.ctx.body = res;
  }
  public async updateAdminUser() {
    const { _id, name, role, password } = this.ctx.request.body;
    const res = await this.ctx.service.adminUser.updateAdminUser({
      _id,
      name,
      role,
      password,
    });
    this.ctx.body = res;
  }
  public async changePassword() {
    const { oldPassword, newPassword } = this.ctx.request.body;
    const _id = parse(this.ctx.header.cookie as string).admin_id;
    const res = await this.ctx.service.adminUser.changePassword({
      _id: Number(_id),
      oldPassword,
      newPassword,
    });
    this.ctx.body = res;
  }
}
