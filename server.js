const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());
//

const port = 3000;
server.listen(port, () => {
	console.log(`Server Listening on ${port}`);
});