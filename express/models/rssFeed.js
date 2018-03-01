// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssFeed model
const RssFeed = bookshelf.Model.extend({
  'tableName' : 'rssFeeds'
}, {
  'create' : function(rssFeed){
    return this.forge(rssFeed).save();
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
  'findOne' : function(query){
    return this.forge(query).fetch();
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
