// Bookshelf
const bookshelf = require('bookshelf');
// Knex
const knexConfig = rootRequire('express/config/knex');



// Bookshelf configuration
module.exports = bookshelf(knexConfig);
