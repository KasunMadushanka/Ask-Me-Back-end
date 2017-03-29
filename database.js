var sql = require('mssql');

var config = {

    user: 'kasun@ask-me',
    password: 'Askme123',
    server: 'ask-me.database.windows.net',
    database: 'ask_me',
    options: {
        encrypt: true
    }
}

module.exports.db_connection = config
