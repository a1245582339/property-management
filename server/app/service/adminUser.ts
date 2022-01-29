import { Service } from 'egg';
import { v4 } from 'uuid';
export enum Role {
  NoLogin,
  SuperAdmin,
  Admin,
}
export default class AdminUser extends Service {
  public async genarateToken(query: { email: string, password: string }) {
    const adminUser = await this.app.knex('admin').where({ ...query, is_del: 0 });
    if (adminUser && adminUser.length) {
      const uuidStr = v4();
      return { _id: adminUser[0]._id, token: uuidStr };
    }
    return {};
  }

  public async getAdminUserInfo(query: { _id: number }) {
    const res = await this.app.knex('admin').where({ _id: query._id, is_del: 0 }).select('_id', 'name', 'email', 'role');
    return res[0];
  }
  public async getAdminUserList(query: { name: string, page: number }) {
    const list = await this.app.knex('admin').where('name', 'like', `%${query.name}%`)
      .andWhere({ is_del: 0 })
      .offset(query.page * 20)
      .limit(20)
      .select('_id', 'name', 'email', 'role');
    const total = (await this.app.knex('admin').where('name', 'like', `%${query.name}%`).andWhere({ is_del: 0 })).length;
    return {
      list, total,
    };
  }
  public async createAdminUser({ name, email, role }: { name: string, email: string, role: Role }) {
    const res = await this.app.knex('admin').where({ email });
    if (res && res.length) {
      return {
        code: 2,
      };
    }
    await this.app.knex('admin').insert({ email, name, password: '670b14728ad9902aecba32e22fa4f6bd', role });
    return {
      code: 0,
    };
  }
  public async deleteAdminUser({ _id }: { _id: number }) {
    await this.app.knex('admin').where({ _id }).update({ is_del: 1 });
    return {
      code: 0,
    };
  }
  public async updateAdminUser({ _id, name, password, role }: { _id: number, name?: string, password?: string, role?: string }) {
    const updateData = { name, role, password };
    Object.keys(updateData).forEach(key => {	// 遍历要修改的数据
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    await this.app.knex('admin').where({ _id, is_del: 0 }).update(updateData);
    return {
      code: 0,
    };
  }
  public async changePassword({ _id, oldPassword, newPassword }: { _id: number, oldPassword: string, newPassword: string }) {
    const user = await this.app.knex('admin').where({ _id, password: oldPassword, is_del: 0 });
    if (user && user.length) {
      const res = await this.updateAdminUser({ _id, password: newPassword });
      return res;
    }
    return {
      code: 7,
    };
  }
}
