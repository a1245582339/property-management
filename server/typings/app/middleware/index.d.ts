// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAuth from '../../../app/middleware/adminAuth';
import ExportClientOrAdminAuth from '../../../app/middleware/clientOrAdminAuth';
import ExportSuperAdminAuth from '../../../app/middleware/superAdminAuth';

declare module 'egg' {
  interface IMiddleware {
    adminAuth: typeof ExportAdminAuth;
    clientOrAdminAuth: typeof ExportClientOrAdminAuth;
    superAdminAuth: typeof ExportSuperAdminAuth;
  }
}
