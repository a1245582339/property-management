import { Service } from 'egg';
export enum MessageType {
  Suggestion = 1,
  Complaint,
  Praise
}
export default class MessageBoard extends Service {
  public async getMessageBoard({ page }: { page: number }) {
    const list = await this.app.knex('user')
      .rightJoin('message_board', 'message_board.user_id', 'user._id')
      .limit(20)
      .offset(page * 20);
    const total = (await this.app.knex('message_board')).length;
    return {
      list, total,
    };
  }

  public async createMessageBoard(body: { user_id: number, type: MessageType, content: string }) {
    await this.app.knex('message_board').insert(body);
    return { code: 0 };
  }
}
