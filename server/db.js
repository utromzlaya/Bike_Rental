const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres", 
    password: "rokoko_06_kek", //password from postgres
    host: "localhost",
    port: "5432",
    database: "bikesrent"
});

module.exports = pool;