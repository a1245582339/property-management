import { Service } from 'egg';
export default class Notice extends Service {
  public async getNoticeList(query: { page: number }) {
    const list = await this.app.knex('notice')
      .orderBy([{ column: 'show', order: 'desc' }, { column: '_id', order: 'desc' }])
      .limit(20)
      .offset(20 * query.page);
    const total = (await this.app.knex('notice')).length;
    return {
      list, total,
    };
  }

  public async getCurrentNotice() {
    const res = await this.app.knex('notice').where({ show: 1 });
    return res;
  }

  public async updateNotice({ _id, show }: { _id: number, show: 0 | 1 }) {
    await this.app.knex('notice').where({ _id }).update({ show });
    return {
      code: 0,
    };
  }

  public async createNotice({ content }: { content: string }) {
    await this.app.knex('notice').insert({ content });
    return {
      code: 0,
    };
  }
}
