// Bookshelf
const bookshelf = rootRequire('config/bookshelf');



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



// Exports
module.exports = RssFeed;
