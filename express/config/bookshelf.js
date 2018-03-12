// Bookshelf
const bookshelf = require('bookshelf');
// Knex
const knexConfig = rootRequire('express/config/knex');



// Bookshelf configuration
const bookshelfConfig = bookshelf(knexConfig);

// Plugins
bookshelfConfig.plugin('pagination');



// Exports
module.exports = bookshelfConfig;
