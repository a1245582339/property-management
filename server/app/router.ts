import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  /* Admin */
  router.post('/api/admin/login', controller.adminUser.login);
  router.post('/api/admin/logout', controller.adminUser.logout);
  router.get('/api/admin/info', controller.adminUser.adminUserInfo);
  router.get('/api/admin/user', controller.adminUser.adminUserList);
  router.post('/api/admin/user', controller.adminUser.createAdminUser);
  router.delete('/api/admin/user', controller.adminUser.deleteAdminUser);
  router.put('/api/admin/user', controller.adminUser.updateAdminUser);
  router.put('/api/admin/password', controller.adminUser.changePassword);

  /* ClientUser */
  router.post('/api/client/login', controller.clientUser.login);
  router.post('/api/client/logout', controller.clientUser.logout);
  router.get('/api/client/user', controller.clientUser.userList);
  router.put('/api/client/user', controller.clientUser.updateUser);

  /* Building */
  router.get('/api/buidling', controller.building.getBuildingList);
  router.post('/api/buidling', controller.building.createBuilding);
  router.del('/api/buidling', controller.building.delBuilding);

  /* Unit */
  router.get('/api/unit', controller.unit.getUnitList);
  router.post('/api/unit', controller.unit.createUnit);
  router.del('/api/unit', controller.unit.delUnit);

  /* Building */
  router.get('/api/room', controller.room.getRoomList);
  router.post('/api/room', controller.room.createRoom);
  router.del('/api/room', controller.room.delRoom);
};
