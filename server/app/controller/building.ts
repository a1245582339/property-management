import { Controller } from 'egg';
export default class Building extends Controller {
  public async getBuildingList() {
    const res = await this.ctx.service.building.getBuilding();
    this.ctx.body = {
      code: 0,
      data: res,
    };
  }
  public async createBuilding() {
    const { num } = this.ctx.request.body;
    const res = await this.ctx.service.building.createBuilding({ num });
    this.ctx.body = res;
  }
  public async delBuilding() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.building.delBuilding({ _id: Number(_id) });
    this.ctx.body = res;
  }
}
