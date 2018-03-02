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
    return this.where({'id' : id}).destroy();
  },
  'findAll' : function(filter){
    return this.where(filter).fetchAll();
  },
  'findById' : function(id){
    return this.where({'id' : id}).fetch();
  },
  'findByRssFeedId' : function(id){
    return this.where({'rssFeedId' : id}).fetch();
  },
  'findByLink' : function(link){
    return this.where({'link' : link}).fetch();
  },
  'findOne' : function(query){
    return this.where(query).fetch();
  }
});



// Exports
module.exports = RssNews;
