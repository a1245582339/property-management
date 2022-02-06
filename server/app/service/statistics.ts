import { Service } from 'egg';
export default class Statistics extends Service {
  public async getOccupancy() {
    const res = await this.app.knex('room') // 查询room表
      .where({ is_del: 0 }) // 只取未删除的房间
      .leftJoin('user_room', 'room._id', 'user_room.room_id'); // 根据room_id进行user_room的左连接
    return res;
  }
  public async getOrder() {
    const res = await this.app.knex('order');
    return res;
  }
  public async getParking() {
    const res = await this.app.knex('parking')
      .where({ is_del: 0 });
    return res;
  }
}
