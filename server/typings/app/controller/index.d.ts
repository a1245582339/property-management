// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/controller/adminUser';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    adminUser: ExportAdminUser;
    home: ExportHome;
  }
}
