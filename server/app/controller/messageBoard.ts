import { parse } from 'cookie';
import { Controller } from 'egg';
export default class Order extends Controller {
  public async getMessageBoardList() {
    const { page } = this.ctx.query;
    const data = await this.ctx.service.messageBoard.getMessageBoard({ page: Number(page) });
    this.ctx.body = {
      data, code: 0,
    };
  }

  public async createMessage() {
    const cookie = parse(this.ctx.header.cookie as string);
    const user_id = cookie.client_id;
    const body = this.ctx.request.body;
    const res = await this.ctx.service.messageBoard.createMessageBoard({ ...body, user_id: Number(user_id) });
    this.ctx.body = res;
  }
}
