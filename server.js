let pg = require("pg");
const url = require("url");

const users = require("./models/users");
const plans = require("./models/plans");
const expenses = require("./models/expenses");

var configs;

// TODO: Find new postgres DB after Heroku
// https://fly.io/docs/reference/postgres/ ?

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(":");

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    ssl: true,
  };
} else {
  configs = {
    user: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    database: "budgetplanner",
    port: 5432,
  };
}

let pool = new pg.Pool(configs);

module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  users: users(pool),
  plans: plans(pool),
  expenses: expenses(pool),

  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool: pool,
};
