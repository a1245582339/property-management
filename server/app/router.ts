import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/admin/token', controller.adminUser.token);
  router.get('/api/admin/info', controller.adminUser.adminUserInfo);
  router.get('/api/admin/user', controller.adminUser.adminUserList);
  router.post('/api/admin/user', controller.adminUser.createAdminUser);
  router.delete('/api/admin/user', controller.adminUser.deleteAdminUser);
  router.put('/api/admin/user', controller.adminUser.updateAdminUser);
  router.put('/api/admin/password', controller.adminUser.changePassword);
};
