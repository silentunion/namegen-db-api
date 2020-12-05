require("dotenv").config();


module.exports = require('knex')({
    client: "postgresql",
    connection: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
        port: DB_PORT
    }
})
