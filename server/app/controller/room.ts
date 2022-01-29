import { Controller } from 'egg';
export default class Room extends Controller {
  public async getRoomList() {
    const { unitId } = this.ctx.query;
    const res = await this.ctx.service.room.getRoom({ unitId: Number(unitId) });
    this.ctx.body = {
      code: 0,
      data: res,
    };
  }
  public async createRoom() {
    const { num, unitId } = this.ctx.request.body;
    const res = await this.ctx.service.room.createRoom({ num, unitId });
    this.ctx.body = res;
  }
  public async delRoom() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.room.delRoom({ _id: Number(_id) });
    this.ctx.body = res;
  }
}
