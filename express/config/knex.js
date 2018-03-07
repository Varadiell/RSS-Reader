// Knex
const knex = require('knex');



// Knex configuration
module.exports = knex({
  'client' : 'sqlite3',
  'connection' : {
    'filename' : 'sqlite3/data.sqlite'
  },
  'useNullAsDefault' : true
});
