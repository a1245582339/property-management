import { Service } from 'egg';
export default class Room extends Service {
  public async getRoom() {
    const res = await this.app.knex('room').where({ is_del: 0 });
    return res;
  }
  public async createRoom({ num, unitId }: { num: string, unitId: number }) {
    await this.app.knex('room').insert({ num, unitId });
    return { code: 0 };
  }
  public async delRoom({ _id }: { _id: number }) {
    await this.app.knex('room').where({ _id }).update({ is_del: 1 });
    return { code: 0 };
  }
  public async delRoomByUnitId({ unitId }: { unitId: number }) {
    await this.app.knex('room').where({ unitId }).update({ is_del: 1 });
    return { code: 0 };
  }
}
