const knex = rootRequire('config/knex');



module.exports = function(req, res, next){

  // Create table rssFeeds if it does not exist.
  knex.schema.hasTable('rssFeeds').then(function(exists){
    if(exists) return next();
    return knex.schema.createTable('rssFeeds', function(table){
      table.increments('id').primary();
      table.string('url', 250);
      table.text('xml', 'longtext');
    }).then(function(){
      console.info('Table "rssFeeds" created.');
      next();
    }).catch(function(err){
      console.info('Error : table "rssFeeds" creation failed.');
      console.info(err);
      next();
    });
  });

};