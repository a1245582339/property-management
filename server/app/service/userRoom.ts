import { Service } from 'egg';
export default class UseRoom extends Service {
  public async getUserRoomByRoomId({ roomId }: { roomId: number }) {
    const res = await this.app
      .knex('user_room')
      .where({ room_id: roomId })
      .leftJoin('user', 'user_room.user_id', 'user._id');
    return res;
  }

  public async getUserRoomByUserId({ userId }: { userId: number }) {
    const res = await this.app
      .knex('user_room')
      .select('user_room.*', 'room.num as room_num', 'unit.num as unit_num', 'building.num as building_num')
      .where({ user_id: userId })
      .leftJoin('room', 'user_room.room_id', 'room._id')
      .leftJoin('unit', 'room.unit_id', 'unit._id')
      .leftJoin('building', 'unit.building_id', 'building._id');
    return res;
  }

  public async addUserRoom({
    userId,
    roomId,
  }: {
    userId: number;
    roomId: number;
  }) {
    await this.app
      .knex('user_room')
      .insert({ user_id: userId, room_id: roomId });
    return { code: 0 };
  }
  public async delUserRoom({
    userId,
    roomId,
  }: {
    userId: number;
    roomId: number;
  }) {
    await this.app
      .knex('user_room')
      .where({ user_id: userId, room_id: roomId }).del();
    return { code: 0 };
  }
}
