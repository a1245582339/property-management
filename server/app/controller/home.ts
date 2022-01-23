import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    ctx.body = await app.redis.get('test');
  }
}
