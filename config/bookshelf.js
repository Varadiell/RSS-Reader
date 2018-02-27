// Bookshelf
const bookshelf = require('bookshelf');
// Knex
const knexConfig = rootRequire('config/knex');



// Bookshelf configuration
module.exports = bookshelf(knexConfig);
