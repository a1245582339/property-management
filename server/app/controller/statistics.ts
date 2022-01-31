import { Controller } from 'egg';
export default class Statistics extends Controller {
  public async getOccupancy() {
    const data = await this.ctx.service.statistics.getOccupancy();
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  public async getOrder() {
    const data = await this.ctx.service.statistics.getOrder();
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  public async getParking() {
    const data = await this.ctx.service.statistics.getParking();
    this.ctx.body = {
      code: 0,
      data,
    };
  }
}
