// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssFeed model
const RssFeed = bookshelf.Model.extend({
  'tableName' : 'rssFeeds'
}, {
  'count' : function(query){
    return this.where(query).count();
  },
  'create' : function(rssFeed){
    return this.forge(rssFeed).save();
  },
  'destroyById' : function(id){
    return this.where({'id' : id}).destroy();
  },
  'findAll' : function(query){
    return this.where(query).fetchAll();
  },
  'findById' : function(id){
    return this.where({'id' : id}).fetch();
  },
  'findByUrl' : function(url){
    return this.where({'url' : url}).fetch();
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
