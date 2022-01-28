import { Service } from 'egg';
import { v4 } from 'uuid';

export default class ClientUser extends Service {
  public async login(data: { phoneNumber: string }) {
    const user = await this.app.knex('user').where({ ...data });
    if (user && user[0]) {
      const res = {
        _id: user[0]._id,
        token: v4(),
      };
      return res;
    }
    const res = await this.register(data);
    return res;


  }
  public async register(data: { phoneNumber: string }) {
    const res = await this.app.knex('user').insert({
      ...data,
      avatar: '',
      name: Math.random().toString(36).slice(-6),
    });
    const _id = res[0] as number;
    return { _id, token: v4() };
  }


  public async userList(query: { phoneNumber: string }) {
    const user = await this.app.knex('user').where('phoneNumber', 'like', `%${query.phoneNumber}%`);
    return user;
  }

  public async updateUser({ _id, avatar, name }: { _id: string, avatar: string, name: string }) {
    const updateData = { avatar, name };
    Object.keys(updateData).forEach(key => {	// 遍历要修改的数据
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    await this.app.knex('user').where({ _id }).update(updateData);
    return { code: 0 };
  }
}
