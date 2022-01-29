import { Controller } from 'egg';
export default class Unit extends Controller {
  public async getUnitList() {
    const { buildingId } = this.ctx.query;
    const res = await this.ctx.service.unit.getUnit({ buildingId: Number(buildingId) });
    this.ctx.body = {
      code: 0,
      data: res,
    };
  }
  public async createUnit() {
    const { num, buildingId } = this.ctx.request.body;
    const res = await this.ctx.service.unit.createUnit({ num, buildingId });
    this.ctx.body = res;
  }
  public async delUnit() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.unit.delUnit({ _id: Number(_id) });
    this.ctx.body = res;
  }
}
