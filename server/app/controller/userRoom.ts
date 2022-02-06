import { parse } from 'cookie';
import { Controller } from 'egg';
export default class UserRoom extends Controller {
  public async getUserRoom() {
    let userId = '';
    const cookie = parse(this.ctx.header.cookie as string);
    if (this.ctx.query.userId) {
      userId = this.ctx.query.userId;
    } else {
      userId = cookie.client_id;
    }
    const { roomId } = this.ctx.query;
    if (roomId) {
      const res = await this.ctx.service.userRoom.getUserRoomByRoomId({
        roomId: Number(roomId),
      });
      this.ctx.body = { data: res, code: 0 };
    } else if (userId) {
      const res = await this.ctx.service.userRoom.getUserRoomByUserId({
        userId: Number(userId),
      });
      this.ctx.body = { data: res, code: 0 };
    }
  }
  public async addUserRoom() {
    const { userId, roomId } = this.ctx.request.body;
    const res = await this.ctx.service.userRoom.addUserRoom({ userId, roomId });
    this.ctx.body = res;
  }
  public async delUserRoom() {
    const { userId, roomId } = this.ctx.request.query;
    const res = await this.ctx.service.userRoom.delUserRoom({
      userId: Number(userId),
      roomId: Number(roomId),
    });
    this.ctx.body = res;
  }
}
