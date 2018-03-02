// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssNews model
const RssNews = bookshelf.Model.extend({
  'tableName' : 'rssNews'
}, {
  'create' : function(rssNews){
    return this.forge(rssNews).save();
  },
  'destroy' : function(id){
    return this.forge({'id' : id}).destroy();
  },
  'findAll' : function(filter){
    return this.forge(filter).fetchAll();
  },
  'findById' : function(id){
    return this.forge({'id' : id}).fetch();
  },
  'findByRssFeedId' : function(id){
    return this.forge({'rssFeedId' : id}).fetch();
  },
  'findByLink' : function(link){
    return this.forge({'link' : link}).fetch();
  },
  'findOne' : function(query){
    return this.forge(query).fetch();
  }
});



// Exports
module.exports = RssNews;
