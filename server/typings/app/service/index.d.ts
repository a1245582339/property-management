// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminUser from '../../../app/service/adminUser';
import ExportBuilding from '../../../app/service/building';
import ExportClientUser from '../../../app/service/clientUser';
import ExportMessageBoard from '../../../app/service/messageBoard';
import ExportNotice from '../../../app/service/notice';
import ExportOrder from '../../../app/service/order';
import ExportParking from '../../../app/service/parking';
import ExportRoom from '../../../app/service/room';
import ExportUnit from '../../../app/service/unit';
import ExportUserRoom from '../../../app/service/userRoom';

declare module 'egg' {
  interface IService {
    adminUser: AutoInstanceType<typeof ExportAdminUser>;
    building: AutoInstanceType<typeof ExportBuilding>;
    clientUser: AutoInstanceType<typeof ExportClientUser>;
    messageBoard: AutoInstanceType<typeof ExportMessageBoard>;
    notice: AutoInstanceType<typeof ExportNotice>;
    order: AutoInstanceType<typeof ExportOrder>;
    parking: AutoInstanceType<typeof ExportParking>;
    room: AutoInstanceType<typeof ExportRoom>;
    unit: AutoInstanceType<typeof ExportUnit>;
    userRoom: AutoInstanceType<typeof ExportUserRoom>;
  }
}
