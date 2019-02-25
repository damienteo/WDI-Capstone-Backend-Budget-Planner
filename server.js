let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
var cors = require('cors')

const PORT = 4000;

let pool = new pg.Pool({
	user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    database: 'budgetplanner',
    port: 5432,
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

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

app.post('/api/new-user', function(request, response) {
	console.log(request.body);
	var name = request.body.user_name;
	var password = request.body.user_password;

	pool.connect((err, db, done) => {
		if (err) {
			return response.status(400).send(err);
		} else {
			db.query('INSERT INTO users (name, password) VALUES($1, $2) RETURNING *',[name,password], ( err, table ) =>{
				if(err) {
					return response.status(400).send(err);
				} else {
					console.log(table.rows);
					response.status(201).send({message: 'Data Inserted'});
				}
			})
		}
	})
})


app.listen(PORT, () => console.log('Listening on port' + PORT))

