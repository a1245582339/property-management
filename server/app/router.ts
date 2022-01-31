import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminAuthMiddleware = app.middleware.adminAuth(app);
  const clientOrAdminAuthMiddleware = app.middleware.clientOrAdminAuth(app);
  const superAdminAuthMiddleware = app.middleware.superAdminAuth();
  /* Admin */
  router.post('/api/admin/login', controller.adminUser.login);
  router.post('/api/admin/logout', controller.adminUser.logout);
  router.get(
    '/api/admin/info',
    adminAuthMiddleware,
    controller.adminUser.adminUserInfo,
  );
  router.get(
    '/api/admin/user',
    adminAuthMiddleware,
    superAdminAuthMiddleware,
    controller.adminUser.adminUserList,
  );
  router.post(
    '/api/admin/user',
    adminAuthMiddleware,
    superAdminAuthMiddleware,
    controller.adminUser.createAdminUser,
  );
  router.del(
    '/api/admin/user',
    adminAuthMiddleware,
    superAdminAuthMiddleware,
    controller.adminUser.deleteAdminUser,
  );
  router.put(
    '/api/admin/user',
    adminAuthMiddleware,
    superAdminAuthMiddleware,
    controller.adminUser.updateAdminUser,
  );
  router.put(
    '/api/admin/password',
    adminAuthMiddleware,
    controller.adminUser.changePassword,
  );

  /* ClientUser */
  router.post('/api/client/login', controller.clientUser.login);
  router.post('/api/client/logout', controller.clientUser.logout);
  router.get(
    '/api/client/userList',
    adminAuthMiddleware,
    controller.clientUser.userList,
  );
  router.get(
    '/api/client/user',
    clientOrAdminAuthMiddleware,
    controller.clientUser.getUserInfo,
  );
  router.put('/api/client/user', clientOrAdminAuthMiddleware, controller.clientUser.updateUser);

  /* Building */
  router.get('/api/building', controller.building.getBuildingList);
  router.post(
    '/api/building',
    adminAuthMiddleware,
    controller.building.createBuilding,
  );
  router.del(
    '/api/building',
    adminAuthMiddleware,
    controller.building.delBuilding,
  );

  /* Unit */
  router.get('/api/unit', controller.unit.getUnitList);
  router.post('/api/unit', adminAuthMiddleware, controller.unit.createUnit);
  router.del('/api/unit', adminAuthMiddleware, controller.unit.delUnit);

  /* Room */
  router.get('/api/room', controller.room.getRoomList);
  router.post('/api/room', adminAuthMiddleware, controller.room.createRoom);
  router.del('/api/room', adminAuthMiddleware, controller.room.delRoom);

  /* UserRoom */
  router.get('/api/userRoom', clientOrAdminAuthMiddleware, controller.userRoom.getUserRoom);
  router.post(
    '/api/userRoom',
    adminAuthMiddleware,
    controller.userRoom.addUserRoom,
  );
  router.del(
    '/api/userRoom',
    adminAuthMiddleware,
    controller.userRoom.delUserRoom,
  );

  /* Parking */
  router.get('/api/parking', adminAuthMiddleware, controller.parking.getParking);
  router.get('/api/client/parking', clientOrAdminAuthMiddleware, controller.parking.getParkingByUserId);
  router.post('/api/parking', adminAuthMiddleware, controller.parking.createParking);
  router.put('/api/parking', adminAuthMiddleware, controller.parking.updateParking);
  router.del('/api/parking', adminAuthMiddleware, controller.parking.delParking);

  /* Notice */
  router.get('/api/notice', adminAuthMiddleware, controller.notice.getNoticeList);
  router.get('/api/currNotice', clientOrAdminAuthMiddleware, controller.notice.getShowNotice);
  router.post('/api/notice', adminAuthMiddleware, controller.notice.createNotice);
  router.put('/api/notice', adminAuthMiddleware, controller.notice.updateNotice);

  /* Order */
  router.get('/api/admin/order', adminAuthMiddleware, controller.order.getOrderList);
  router.get('/api/client/order', clientOrAdminAuthMiddleware, controller.order.getOrderListByClientUser);
  router.post('/api/order', adminAuthMiddleware, controller.order.createOrder);
  router.put('/api/order', adminAuthMiddleware, controller.order.updateOrder);

  /* Message */
  router.get('/api/message', adminAuthMiddleware, controller.messageBoard.getMessageBoardList);
  router.post('/api/message', clientOrAdminAuthMiddleware, controller.messageBoard.createMessage);

  /* File */
  router.post('/api/file', controller.file.upload);

  /* Statistics */
  router.get('/api/statistics/occupancy', controller.statistics.getOccupancy);
  router.get('/api/statistics/parking', controller.statistics.getParking);
  router.get('/api/statistics/order', controller.statistics.getOrder);
};
