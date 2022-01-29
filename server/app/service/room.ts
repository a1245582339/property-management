import { Service } from 'egg';
export default class Room extends Service {
  public async getRoom({ unitId }: { unitId: number }) {
    const res = await this.app.knex('room').where({ is_del: 0, unit_id: unitId });
    return res;
  }
  public async createRoom({ num, unitId }: { num: string; unitId: number }) {
    await this.app.knex('room').insert({ num, unit_id: unitId });
    return { code: 0 };
  }
  public async delRoom({ _id }: { _id: number }) {
    const delRoom = this.app.knex('room').where({ _id }).update({ is_del: 1 });
    const delUserRoom = this.app.knex('user_room').where({ room_id: _id }).del();
    await Promise.all([delRoom, delUserRoom]);
    return { code: 0 };
  }
  public async delRoomByUnitId({ unitId }: { unitId: number }) {
    const roomIds: { _id: number }[] = await this.app.knex('room').where({ unit_id: unitId }).select('_id');
    const delUserRoom = (roomId: number) => this.app.knex('user_room').where({ room_id: roomId }).del();
    await this.app.knex('room').where({ unit_id: unitId }).update({ is_del: 1 });
    await Promise.all([roomIds.map(roomId => delUserRoom(roomId._id))]);
    return { code: 0 };
  }
}
