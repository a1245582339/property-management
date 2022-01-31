import { parse } from 'cookie';
import { Controller } from 'egg';
export default class Parking extends Controller {
  public async getParking() {
    const { phoneNumber, page, empty } = this.ctx.query;
    const data = await this.ctx.service.parking.getParking({
      phoneNumber,
      page: Number(page),
      empty: !!empty,
    });
    this.ctx.body = {
      data,
      code: 0,
    };
  }
  public async getParkingByUserId() {
    const cookie = parse(this.ctx.header.cookie as string);
    const user_id = cookie.client_id;
    const data = await this.ctx.service.parking.getParkingByUserId({
      user_id: Number(user_id),
    });
    this.ctx.body = {
      data,
      code: 0,
    };
  }
  public async createParking() {
    const { parkingCode } = this.ctx.request.body;
    const res = await this.ctx.service.parking.createParking({ parkingCode });
    this.ctx.body = res;
  }
  public async updateParking() {
    const { _id, carNumber, userId } = this.ctx.request.body;
    const res = await this.ctx.service.parking.updateParking({
      _id,
      carNumber,
      userId,
    });
    this.ctx.body = res;
  }
  public async delParking() {
    const { _id } = this.ctx.request.query;
    const res = await this.ctx.service.parking.deleteParking({ _id: Number(_id) });
    this.ctx.body = res;
  }
}
