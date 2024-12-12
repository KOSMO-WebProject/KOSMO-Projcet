const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool
({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: '4454',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getUsers = async ()=>
{
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('select * from users;');
    console.log(rows);
    return rows;
};

module.exports = 
{
    getUsers
};