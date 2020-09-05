const knex = require('knex');
const path = require('path');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 123456,
        database: 'servernodejs'
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    }
})

module.exports = db;