const Pool = require('pg').Pool;
const the_pool = new Pool({
	user: 'asu',
	host: '192.168.1.23',
	database: 'asu',
	password: 'asu',
	port: 5432,
});

the_pool.connect();

const pool = the_pool;

module.exports = {
	pool
}