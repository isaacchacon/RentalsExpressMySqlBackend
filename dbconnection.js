var mysql = require('mysql');
var connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'auto7lata',
    database:'rentals_db'
});
module.exports = connection;