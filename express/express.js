// Modules
const express = require('express');
const path = require('path');

// Express
const app = express();

// Start listening
app.listen(3000, function(){
  console.info('Listening on port 3000...');
});

const knex = require('knex')({
  'client' : 'sqlite3',
  'connection' : {
    'filename' : 'data.sqlite'
  },
  'useNullAsDefault' : true
});

const bookshelf = require('bookshelf')(knex);

// Create table rssFeeds if it does not exist.
knex.schema.hasTable('rssFeeds').then(function(exists){
  if(!exists){
    return knex.schema.createTable('rssFeeds', function(table){
      table.increments('id');
      table.string('url', 250);
      table.text('xml', 'longtext');
    }).then(function(){
      console.info('Table "rssFeeds" created.');
    }).catch(function(err){
      console.info('Error : table "rssFeeds" creation failed.');
      console.info(err);
    });
  }
});

// RssFeed model
const RssFeed = bookshelf.Model.extend({
  'tableName' : 'rssFeeds'
}, {
  'create' : function(data, options){
    return this.forge(data).save(null, options);
  },
  'findById' : function(id, options){
    return this.findOne({[this.prototype.idAttribute] : id}, options);
  },
  'findByUrl' : function(url){
    return this.forge().query({'where' : {'url' : url}}).fetch();
  },
  'findAll' : function(filter, options){
    return this.forge().where(filter).fetchAll(options);
  },
  'findOne' : function(query, options){
    return this.forge(query).fetch(options);
  },
  'destroy' : function(options){
    return this.forge({[this.prototype.idAttribute] : options.id}).destroy(options);
  }
});

// Test find (by id)
RssFeed.findById(1).then(function(rssFeed){
  console.info(rssFeed);
});

// Test create
const newRssFeed = {
  'url' : 'https://www.judgehype.com/nouvelles.xml'
};
RssFeed.create(newRssFeed).then(function(rssFeed){
  console.info(rssFeed);
});



// Serve views folder (dist)
app.use('', express.static(path.join(__dirname, '../dist')));

// 404
app.use(function(req, res, next){
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error
app.use(function(err, req, res){
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page.
  res.status(err.status || 500);
  res.send('error : ' + err.status);
});
