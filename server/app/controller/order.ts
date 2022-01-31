import { parse } from 'cookie';
import { Controller } from 'egg';
export default class Order extends Controller {
  public async getOrderList() {
    const { phoneNumber, status, page } = this.ctx.query;
    const data = await this.ctx.service.order.getOrder({ phoneNumber, status: Number(status), page: Number(page) });
    this.ctx.body = {
      data, code: 0,
    };
  }

  public async getOrderListByClientUser() {
    const { status, page } = this.ctx.query;
    const cookie = parse(this.ctx.header.cookie as string);
    const user_id = cookie.client_id;
    const data = await this.ctx.service.order.getOrder({ status: Number(status), page: Number(page), user_id: Number(user_id) });
    this.ctx.body = {
      data, code: 0,
    };
  }

  public async createOrder() {
    const body = this.ctx.request.body;
    const res = await this.ctx.service.order.createOrder(body);
    this.ctx.body = res;
  }

  public async updateOrder() {
    const body = this.ctx.request.body;
    const res = await this.ctx.service.order.updateOrder(body);
    this.ctx.body = res;
  }
}
