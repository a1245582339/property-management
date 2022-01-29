// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';
import ExportBuilding from '../../../app/controller/building';
import ExportClientUser from '../../../app/controller/clientUser';
import ExportNotice from '../../../app/controller/notice';
import ExportParking from '../../../app/controller/parking';
import ExportRoom from '../../../app/controller/room';
import ExportUnit from '../../../app/controller/unit';
import ExportUserRoom from '../../../app/controller/userRoom';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
    building: ExportBuilding;
    clientUser: ExportClientUser;
    notice: ExportNotice;
    parking: ExportParking;
    room: ExportRoom;
    unit: ExportUnit;
    userRoom: ExportUserRoom;
  }
}
