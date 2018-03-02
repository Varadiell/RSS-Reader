const knex = rootRequire('express/config/knex');



// Create table rssFeeds if it does not exist.
knex.schema.hasTable('rssFeeds').then(function(exists){
  if(exists) return;
  return knex.schema.createTable('rssFeeds', function(table){
    table.increments('id').primary();
    table.string('url', 250);
  }).then(function(){
    console.info('Table "rssFeeds" created.');
  }).catch(function(err){
    console.info('Error : table "rssFeeds" creation failed.');
    console.info(err);
  });
});
