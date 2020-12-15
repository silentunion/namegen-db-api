const { migrate } = require('postgres-migrations');
const config = require('./config');

exports.run = async function ({ host, database, port, user, password = '' }) {
    const nodePath = config.get('NODE_PATH');
    const dir = `${nodePath}/../sql/migrations`;
    return migrate({ host, database, port: parseInt(port), user, password}, dir);
};