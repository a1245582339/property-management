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
import ExportRoom from '../../../app/service/room';
import ExportTest from '../../../app/service/Test';
import ExportUnit from '../../../app/service/unit';

declare module 'egg' {
  interface IService {
    adminUser: AutoInstanceType<typeof ExportAdminUser>;
    building: AutoInstanceType<typeof ExportBuilding>;
    clientUser: AutoInstanceType<typeof ExportClientUser>;
    room: AutoInstanceType<typeof ExportRoom>;
    test: AutoInstanceType<typeof ExportTest>;
    unit: AutoInstanceType<typeof ExportUnit>;
  }
}
