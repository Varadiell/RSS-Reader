const knex = rootRequire('express/config/knex');



// Create table rssFeeds if it does not exist.
knex.schema.hasTable('rssFeeds').then(function(exists){
  if(exists) return;
  return knex.schema.createTable('rssFeeds', function(table){
    table.increments('id').primary();
    table.string('description', 1000);
    table.string('image', 250);
    table.string('link', 250);
    table.string('title', 250);
    table.string('url', 250);
  }).then(function(){
    console.info('Table "rssFeeds" created.');
  }).catch(function(err){
    console.info('Error : table "rssFeeds" creation failed.');
    console.info(err);
  });
});

// Create table rssNews if it does not exist.
knex.schema.hasTable('rssNews').then(function(exists){
  if(exists) return;
  return knex.schema.createTable('rssNews', function(table){
    table.increments('id').primary();
    table.integer('rssFeedId');
    table.string('description', 1000);
    table.string('link', 250);
    table.date('pubDate');
    table.string('title', 150);
  }).then(function(){
    console.info('Table "rssNews" created.');
  }).catch(function(err){
    console.info('Error : table "rssNews" creation failed.');
    console.info(err);
  });
});
