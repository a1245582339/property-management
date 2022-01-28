// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';
import ExportBuilding from '../../../app/controller/building';
import ExportClientUser from '../../../app/controller/clientUser';
import ExportHome from '../../../app/controller/home';
import ExportRoom from '../../../app/controller/room';
import ExportUnit from '../../../app/controller/unit';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
    building: ExportBuilding;
    clientUser: ExportClientUser;
    home: ExportHome;
    room: ExportRoom;
    unit: ExportUnit;
  }
}
