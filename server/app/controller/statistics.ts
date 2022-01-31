import { Controller } from 'egg';
export default class Statistics extends Controller {
  public async getOccupancy() {
    const data = await this.ctx.service.statistics.getOccupancy();
    this.ctx.body = {
      code: 0,
      data,
    };
  }
}
