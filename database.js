var Pg = require('pg').Pool;
var pg = new Pg({
    user: "postgres",
    password: "Faiz1616@",
    database: "dbassignment",
    host: "localhost",
    port: 5432
});
module.exports = pg;
