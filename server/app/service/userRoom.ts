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
      .where({ user_id: userId }) // 根据userId查询
      .leftJoin('room', 'user_room.room_id', 'room._id') // 关联room表
      .leftJoin('unit', 'room.unit_id', 'unit._id') // 关联unit表
      .leftJoin('building', 'unit.building_id', 'building._id');// 关联building表
    return res;
  }

  public async addUserRoom({
    userId,
    roomId,
  }: {
    userId: number;
    roomId: number;
  }) {
    const exist = await this.app
      .knex('user_room')
      .where({ user_id: userId, room_id: roomId }); // 查询当前user_room关系是否已存在
    !exist.length && await this.app // 如果已存在则不做操作，否则将关系加入表中
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
