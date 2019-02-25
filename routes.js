module.exports = (app, db) => {

  const users = require('./controllers/users')(db);

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
   *  Entries
   *  =========================================
   */


 // CRUD journals

 /*
   *  =========================================
   *  Miscellaneous
   *  =========================================
   */

  // app.get('/', users.index);
  // app.get('*', users.noPage);

};
