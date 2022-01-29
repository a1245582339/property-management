import { Service } from 'egg';
export default class Parking extends Service {
  public async getParking({
    phoneNumber,
    page,
    empty,
  }: {
    phoneNumber: string;
    page: number;
    empty: boolean;
  }) {
    if (phoneNumber) {
      const list = await this.app
        .knex('user')
        .where('phoneNumber', 'like', `%${phoneNumber}%`)
        .andWhere({ is_del: 0 })
        .leftJoin('parking', 'parking.user_id', 'user._id')
        .limit(20)
        .offset(20 * page);
      const total = (await this.app
        .knex('user')
        .where('phoneNumber', 'like', `%${phoneNumber}%`).leftJoin('parking', 'parking.user_id', 'user._id')).length;
      return {
        list, total,
      };
    } else if (empty) {
      const list = await this.app
        .knex('parking')
        .whereNull('user_id')
        .andWhere({ is_del: 0 })
        .limit(20)
        .offset(20 * page);
      const total = (await this.app.knex('parking')
        .whereNull('user_id').andWhere({ is_del: 0 }));
      return {
        list, total,
      };
    }
    const list = await this.app
      .knex('parking')
      .select('parking.*', 'user.name', 'user.phoneNumber')
      .where({ is_del: 0 })
      .leftJoin('user', 'parking.user_id', 'user._id')
      .limit(20)
      .offset(20 * page);
    const total = (await this.app
      .knex('parking')
      .leftJoin('user', 'parking.user_id', 'user._id')).length;
    return { total, list };

  }
  public async deleteParking({ _id }: { _id: number }) {
    await this.app
      .knex('parking')
      .where({ _id })
      .update({ is_del: 1, car_number: null, user_id: null });
    return { code: 0 };
  }
  public async createParking({ parkingCode }: { parkingCode: string }) {
    await this.app.knex('parking').insert({ parking_code: parkingCode });
    return { code: 0 };
  }
  public async updateParking({
    _id,
    carNumber,
    userId,
  }: {
    _id: number;
    carNumber: string;
    userId: number;
  }) {
    await this.app
      .knex('parking')
      .where({ _id, is_del: 0 })
      .update({ car_number: carNumber, user_id: userId });
    return { code: 0 };
  }
}
