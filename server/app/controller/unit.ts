import { Controller } from 'egg';
export default class Unit extends Controller {
  public async getUnitList() {
    const res = await this.ctx.service.unit.getUnit();
    return {
      code: 0,
      data: res,
    };
  }
  public async createUnit() {
    const { num, buildingId } = this.ctx.body;
    const res = await this.ctx.service.unit.createUnit({ num, buildingId });
    return res;
  }
  public async delUnit() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.unit.delUnit({ _id: Number(_id) });
    return res;
  }
}
