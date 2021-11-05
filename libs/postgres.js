const { Client } = require('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        post: 5432, 
        user: 'postgres',
        password: '',
        database: 'My_Store'
    });
    
    await client.connect();
    return client;
}

module.exports = getConnection;
