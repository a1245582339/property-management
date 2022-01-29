import { Controller } from 'egg';
export default class Notice extends Controller {
  public async getNoticeList() {
    const { page } = this.ctx.query;
    const data = await this.ctx.service.notice.getNoticeList({ page: Number(page) });
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  public async getShowNotice() {
    const data = await this.ctx.service.notice.getCurrentNotice();
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  public async createNotice() {
    const { content } = this.ctx.request.body;
    const res = await this.ctx.service.notice.createNotice({ content });
    this.ctx.body = res;
  }

  public async updateNotice() {
    const { show, _id } = this.ctx.request.body;
    const res = await this.ctx.service.notice.updateNotice({ show, _id });
    this.ctx.body = res;
  }
}
