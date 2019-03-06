module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  const plans = require('./controllers/plans')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD users

  app.post('/api/new-user', users.registered);
  // app.post('/users/registered', users.registered);

  // Authentication

  // app.get('/users/login', users.login);
  app.post('/api/login', users.loggedin);
  // app.get('/users/logout', users.logout);
  // app.get('/users/profile', users.profile);

  /*
   *  =========================================
   *  Plans
   *  =========================================
   */

  // CRUD journals

  app.post('/api/new-plan', plans.newPlan);
  // app.get('/api/view-plan', plans.viewPlan);
  // app.get('/api/update-plan', plans.updatePlan);

  /*
   *  =========================================
   *  Miscellaneous
   *  =========================================
   */

  // app.get('/', users.index);
  // app.get('*', users.noPage);

};