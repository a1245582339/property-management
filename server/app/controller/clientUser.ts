import { parse } from 'cookie';
import { Controller } from 'egg';
export default class ClientUser extends Controller {
  public async login() {
    const { phoneNumber = '' } = this.ctx.request.body;
    const res = await this.ctx.service.clientUser.login({ phoneNumber });
    this.app.redis.set(`client_user_${res._id}_token`, res.token);
    this.ctx.cookies.set(`client_id=${res._id};path=/;max-age=604800;HTTPOnly;`);
    this.ctx.cookies.set(`client_authorization_token=${res.token};path=/;max-age=604800;HTTPOnly;`);
    this.ctx.body = { code: 0 };
  }
  public async logout() {
    const cookie = parse(this.ctx.header.cookie as string);
    this.app.redis.del(`client_user_${cookie.client_id}_token`);
    this.ctx.cookies.set('client_id=;path=/;max-age=604800;HTTPOnly;');
    this.ctx.cookies.set('client_authorization_token=;path=/;max-age=604800;HTTPOnly;');
    this.ctx.body = { code: 0 };
  }
  public async userList() {
    const { phoneNumber = '', getList, page } = this.ctx.query;
    const res = await this.ctx.service.clientUser.userList({ phoneNumber, page: Number(page) });
    if (getList) {
      this.ctx.body = {
        data: res,
        code: 0,
      };
    } else {
      this.ctx.body = {
        data: res.list[0],
        code: 0,
      };
    }
  }
  public async getUserInfo() {
    const cookie = parse(this.ctx.header.cookie as string);
    const _id = cookie?.client_id;
    const data = await this.ctx.service.clientUser.userInfo({ _id: Number(_id) });
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  public async updateUser() {
    const cookie = parse(this.ctx.header.cookie as string);
    const _id = cookie?.client_id;
    const { name, avatar } = this.ctx.request.body;
    const res = await this.ctx.service.clientUser.updateUser({ _id, name, avatar });
    this.ctx.body = res;
  }
}
