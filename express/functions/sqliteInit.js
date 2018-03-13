// Knex
const knex = rootRequire('express/config/knex');



// Create table rssFeeds if it does not exist.
knex.schema.hasTable('rssFeeds').then(function(exists){
  if(exists) return;
  return knex.schema.createTable('rssFeeds', function(table){
    // Primary
    table.increments('id').primary();
    // Fields
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
    // Primary
    table.increments('id').primary();
    // Secondary
    table.integer('rssFeedId');
    // Fields
    table.string('description', 1000);
    table.boolean('isFavorite');
    table.string('link', 250);
    table.integer('pubDate');
    table.string('title', 150);
  }).then(function(){
    console.info('Table "rssNews" created.');
  }).catch(function(err){
    console.info('Error : table "rssNews" creation failed.');
    console.info(err);
  });
});
