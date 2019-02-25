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
app.use(cors())





app.listen(PORT, () => console.log('Listening on port' + PORT))

