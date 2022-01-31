// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';
import ExportBuilding from '../../../app/controller/building';
import ExportClientUser from '../../../app/controller/clientUser';
import ExportFile from '../../../app/controller/file';
import ExportMessageBoard from '../../../app/controller/messageBoard';
import ExportNotice from '../../../app/controller/notice';
import ExportOrder from '../../../app/controller/order';
import ExportParking from '../../../app/controller/parking';
import ExportRoom from '../../../app/controller/room';
import ExportStatistics from '../../../app/controller/statistics';
import ExportUnit from '../../../app/controller/unit';
import ExportUserRoom from '../../../app/controller/userRoom';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
    building: ExportBuilding;
    clientUser: ExportClientUser;
    file: ExportFile;
    messageBoard: ExportMessageBoard;
    notice: ExportNotice;
    order: ExportOrder;
    parking: ExportParking;
    room: ExportRoom;
    statistics: ExportStatistics;
    unit: ExportUnit;
    userRoom: ExportUserRoom;
  }
}
