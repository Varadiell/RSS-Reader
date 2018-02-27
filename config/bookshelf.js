// Bookshelf
const bookshelf = require('bookshelf');
// Knex
const knexConfig = rootRequire('config/knex');



module.exports = bookshelf(knexConfig);
