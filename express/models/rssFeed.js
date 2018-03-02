// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssFeed model
const RssFeed = bookshelf.Model.extend({
  'tableName' : 'rssFeeds'
}, {
  'create' : function(rssFeed){
    return this.where(rssFeed).save();
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
  'findOne' : function(query){
    return this.where(query).fetch();
  },
  'update' : function(id, data){
    const options = {'patch' : true, 'require' : true};
    return this.findById(id).then(function(rssFeed){
      return rssFeed ? rssFeed.save(data, options) : undefined;
    });
  }
});



// Exports
module.exports = RssFeed;
