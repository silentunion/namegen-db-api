const { Pool } = require('pg');
const config = require('./config');
const migrate = require('./migrations');

exports.start = async function () {
    const host = config.get('PGHOST');
    const database = config.get('PGDATABASE');
    const port = config.get('PGPORT');
    const user = config.get('PGUSER');
    const password = config.get('PGPASSWORD');
    await migrate.run({ host, database, port, user, password })
    this.pool = new Pool({ host, database, port, user, password });
};

exports.close = async function () {
    await this.pool.end();
};

exports.query = async function (q, data) {
    return this.pool.query(q, data);
};
