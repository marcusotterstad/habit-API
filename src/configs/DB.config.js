const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'habits',
  password: '123',
  port: 5432
});

module.exports = pool;