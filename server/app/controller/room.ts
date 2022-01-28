import { Controller } from 'egg';
export default class Room extends Controller {
  public async getRoomList() {
    const res = await this.ctx.service.room.getRoom();
    return {
      code: 0,
      data: res,
    };
  }
  public async createRoom() {
    const { num, unitId } = this.ctx.body;
    const res = await this.ctx.service.room.createRoom({ num, unitId });
    return res;
  }
  public async delRoom() {
    const { _id } = this.ctx.query;
    const res = await this.ctx.service.room.delRoom({ _id: Number(_id) });
    return res;
  }
}
