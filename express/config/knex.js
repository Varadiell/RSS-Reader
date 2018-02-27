// Knex
const knex = require('knex');



// Knex configuration
module.exports = knex({
  'client' : 'sqlite3',
  'connection' : {
    'filename' : 'data.sqlite'
  },
  'useNullAsDefault' : true
});
