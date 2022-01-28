import { Service } from 'egg';
export default class Unit extends Service {
  public async getUnit() {
    const res = await this.app.knex('unit').where({ is_del: 0 });
    return res;
  }
  public async createUnit({ num, buildingId }: { num: string, buildingId: number }) {
    await this.app.knex('unit').insert({ num, buildingId });
    return { code: 0 };
  }
  public async delUnit({ _id }: { _id: number }) {
    const delSelf = this.app.knex('unit').where({ _id }).update({ is_del: 1 });
    const delRoom = this.ctx.service.room.delRoomByUnitId({ unitId: _id });
    await Promise.all([delSelf, delRoom]);
    return { code: 0 };
  }
  public async delUnitByBuilingId({ buildingId }: { buildingId: number }) {
    const uniIds: number[] = await this.app.knex('unit').where({ buildingId }).update({ is_del: 1 });
    const delRoom = (unitId: number) => this.ctx.service.room.delRoomByUnitId({ unitId });
    await Promise.all(uniIds.map(unitId => delRoom(unitId)));
    return { code: 0 };
  }
}
