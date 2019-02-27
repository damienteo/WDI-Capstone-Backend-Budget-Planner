let pg = require('pg');
const url = require('url');

const users = require('./models/users');

var configs;

if (process.env.DATABASE_URL) {

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };

} else {

    configs = {
		user: 'postgres',
	    password: 'postgres',
	    host: '127.0.0.1',
	    database: 'budgetplanner',
	    port: 5432,
	};
}

let pool = new pg.Pool(configs)




// pool.connect((err, db, done) => {
// 	if (err) {
// 		return console.log(err);
// 	} else {
// 		db.query('select * from country', ( err, table ) =>{
// 			if(err) {
// 				return console.log(err);
// 			} else {
// 				console.log(table.rows);
// 			}
// 		})
// 	}
// })

// pool.connect((err, db, done) => {
// 	if (err) {
// 		return console.log(err);
// 	} else {

// 		let country_name = 'Singapore';
// 		let continent_name= 'Asia';
// 		db.query('INSERT INTO country (country_name, continent_name) VALUES($1, $2) RETURNING *',[country_name,continent_name], ( err, table ) =>{
// 			if(err) {
// 				return console.log(err);
// 			} else {
// 				console.log(table.rows);
// 				db.end();
// 			}
// 		})
// 	}
// })

// app.get('/api/countries', function(request, response) {
// 	// console.log(request.body);

// 	pool.connect(function(err, db, done) {
// 		if (err) {
// 			return response.status(400).send(err);
// 		} else {
// 			db.query('SELECT * FROM country', function(err, table) {
// 				if(err) {
// 					return response.status(400).send(err);
// 				} else {
// 					return response.status(200).send(table.rows);
// 				}
// 			})
// 		}
// 	})
// })

module.exports = {
    /*
     * ADD APP MODELS HERE
     */
    users: users(pool),

    //make queries directly from here
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

    // get a reference to end the connection pool at server end
    pool: pool
};
