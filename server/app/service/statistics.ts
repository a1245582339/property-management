import { Service } from 'egg';
export default class Statistics extends Service {
  public async getOccupancy() {
    const res = await this.app.knex('room').where({ is_del: 0 }).leftJoin('user_room', 'room._id', 'user_room.room_id');
    return res;
  }
  public async getOrder() {
    const res = await this.app.knex('order');
    return res;
  }
  public async getParking() {
    const res = await this.app.knex('parking').where({ is_del: 0 }).leftJoin('user', 'user._id', 'parking.user_id');
    return res;
  }
}
