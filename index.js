let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors')

const db = require('./server');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes to match incoming requests
require('./routes')(app, db);

/**
 * ===================================
 * Listen to requests on port 4000
 * ===================================
 */

const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => console.log('Listening on port' + PORT))

let onClose = function() {

    server.close(() => {
        console.log('Process terminated')
        db.pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);