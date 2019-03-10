module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  const plans = require('./controllers/plans')(db);
  const expenses = require('./controllers/expenses')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD users

  app.post('/api/new-user', users.registered);
  app.post('/api/login', users.loggedin);

  /*
   *  =========================================
   *  Plans
   *  =========================================
   */

  // CRUD plans

  app.post('/api/set-plan', plans.setPlan);
  app.put('/api/get-plan', plans.getPlan);

  /*
   *  =========================================
   *  Expenses
   *  =========================================
   */

  // CRUD expenses

  app.post('/api/set-expense', expenses.setExpense);
  app.delete('/api/delete-expense', expenses.deleteExpense);


  /*
   *  =========================================
   *  Miscellaneous
   *  =========================================
   */

  app.get('/ping', (request, response) => {
    response.status(201).send({
      message: 'Successfully Pingged'
    });
  });

};