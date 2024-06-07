const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "grbookstore",
    password: "jena2019",
    port: 5432,
});

module.exports = pool;
