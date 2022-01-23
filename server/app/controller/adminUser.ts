import { Controller } from 'egg';

export default class AdminUser extends Controller {
  public async token() {
    const { ctx } = this;
    const { password = '', email = '' } = ctx.request.body;
    const res = await ctx.service.adminUser.genarateToken({ password, email });
    if (res.adminUser) {
      ctx.cookies.set(`user_id=${res.adminUser._id};path=/;max-age=604800;HTTPOnly;`);
      ctx.cookies.set(`authorization_token=${res.token};path=/;max-age=604800;HTTPOnly;`);
      this.app.redis.set(`admin_user_${res.adminUser._id}_token`, res.token!);
      ctx.body = {
        code: 0,
      };
    } else {
      ctx.body = {
        code: 4,
        msg: 'TEL OR PASSWORD ERROR',
      };
    }
  }
  public async adminUserInfo() {
    const { ctx } = this;
    const _id = ctx.cookies.get('user_id');
    const res = await ctx.service.adminUser.getAdminUserInfo({ _id: Number(_id) });
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
    const res = await ctx.service.adminUser.getAdminUserList({ name, page: Number(page) });
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
    const res = await this.ctx.service.adminUser.createAdminUser({ name, email, role });
    this.ctx.body = res;
  }
  public async deleteAdminUser() {
    const { _id } = this.ctx.request.query;
    const res = await this.ctx.service.adminUser.deleteAdminUser({ _id: Number(_id) });
    this.ctx.body = res;
  }
  public async updateAdminUser() {
    const { _id, name, role } = this.ctx.request.body;
    const res = await this.ctx.service.adminUser.updateAdminUser({ _id, name, role });
    this.ctx.body = res;
  }
  public async changePassword() {
    const { _id, oldPassword, newPassword } = this.ctx.request.body;
    const res = await this.ctx.service.adminUser.changePassword({ _id, oldPassword, newPassword });
    this.ctx.body = res;
  }
}
