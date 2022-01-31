import { Service } from 'egg';
export enum OrderStatus {
  Created = 1,
  Dealed,
  Complete
}
export default class Order extends Service {
  public async getOrder({ status, page, phoneNumber, user_id }: { status?: OrderStatus, page: number, phoneNumber?: string, user_id?: number }) {
    const query = status ? { status } : {};
    if (phoneNumber !== undefined) {
      const list = await this.app.knex('user')
        .where(query)
        .andWhere('user.phoneNumber', 'like', `%${phoneNumber}%`)
        .rightJoin('order', 'order.user_id', 'user._id')
        .limit(20)
        .offset(20 * page)
        .orderBy('create_time', 'desc');
      const total = (await this.app.knex('user')
        .rightJoin('order', 'order.user_id', 'user._id')
        .where(query)
        .andWhere('user.phoneNumber', 'like', `%${phoneNumber}%`)).length;
      return {
        list,
        total,
      };
    } else if (user_id) {
      const list = await this.app.knex('order')
        .where({ ...query, user_id })
        .limit(20)
        .offset(20 * page)
        .orderBy('create_time', 'desc');
      const total = (await await this.app.knex('order')
        .where({ ...query, user_id })).length;
      return {
        list, total,
      };
    }
  }
  public async createOrder(body: { user_id: number, title: string, desp: string }) {
    await this.app.knex('order').insert({ ...body, create_time: Date.now(), status: OrderStatus.Created });
    return { code: 0 };
  }

  public async updateOrder(body: { _id: number, status: OrderStatus }) {
    const timeObj = { [body.status === OrderStatus.Dealed ? 'deal_time' : 'complete_time']: Date.now() };
    await this.app.knex('order').where({ _id: body._id }).update({ status: body.status, ...timeObj });
    return { code: 0 };
  }
}
