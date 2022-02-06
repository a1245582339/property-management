import { Service } from 'egg';
export default class Building extends Service {
  public async getBuilding() {
    const res = await this.app.knex('building').where({ is_del: 0 });
    return res;
  }
  public async createBuilding({ num }: { num: string }) {
    await this.app.knex('building').insert({ num });
    return { code: 0 };
  }
  public async delBuilding({ _id }: { _id: number }) {
    const delSelf = this.app.knex('building').where({ _id }).update({ is_del: 1 });
    const delUnit = this.ctx.service.unit.delUnitByBuilingId({ buildingId: _id });
    await Promise.all([delSelf, delUnit]);
    return { code: 0 };
  }
}
