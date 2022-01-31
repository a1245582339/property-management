import { Service } from 'egg';
export default class Statistics extends Service {
  public async getOccupancy() {
    const res = await this.app.knex('room').where({ is_del: 0 }).leftJoin('user_room', 'room._id', 'user_room.room_id');
    return res;
  }
}
