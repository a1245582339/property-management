import { Controller } from 'egg';
export default class Building extends Controller {
  public async getBuildingList() {
    const res = await this.ctx.service.building.getBuilding();
    return {
      code: 0,
      data: res,
    };
  }
  public async createBuilding() {
    const { num } = this.ctx.body;
    const res = await this.ctx.service.building.createBuilding({ num });
    return res;
  }
  public async delBuilding() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.building.delBuilding({ _id: Number(_id) });
    return res;
  }
}
