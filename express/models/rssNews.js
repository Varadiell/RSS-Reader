// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssNews model
const RssNews = bookshelf.Model.extend({
  'tableName' : 'rssNews'
}, {
  'count' : function(query){
    return this.where(query).count();
  },
  'create' : function(rssNews){
    return this.forge(rssNews).save();
  },
  'destroyByRssFeedId' : function(rssFeedId){
    return this.where({'rssFeedId' : rssFeedId}).destroy();
  },
  'findAll' : function(query){
    return this.where(query).orderBy('-pubDate').fetchAll();
  },
  'findById' : function(id){
    return this.where({'id' : id}).fetch();
  },
  'findByLink' : function(link){
    return this.where({'link' : link}).fetch();
  },
  'findByRssFeedId' : function(id){
    return this.where({'rssFeedId' : id}).fetch();
  },
  'findOne' : function(query){
    return this.where(query).fetch();
  },
  'paginate' : function(query, page, pageSize){
    return this.where(query).orderBy('-pubDate').fetchPage({
      'page' : page,
      'pageSize' : pageSize
    });
  }
});



// Exports
module.exports = RssNews;
