// Bookshelf
const bookshelf = rootRequire('express/config/bookshelf');



// RssFeed model
const RssFeed = bookshelf.Model.extend({
  'tableName' : 'rssFeeds'
}, {
  'create' : function(data, options){
    return this.forge(data).save(null, options);
  },
  'destroy' : function(options){
    return this.forge({[this.prototype.idAttribute] : options.id}).destroy(options);
  },
  'findAll' : function(filter, options){
    return this.forge().where(filter).fetchAll(options);
  },
  'findById' : function(id, options){
    return this.findOne({[this.prototype.idAttribute] : id}, options);
  },
  'findByUrl' : function(url){
    return this.forge().query({'where' : {'url' : url}}).fetch();
  },
  'findOne' : function(query, options){
    return this.forge(query).fetch(options);
  },
  'update' : function(data, options){
    const opts = Object.assign({'patch' : true, 'require' : true}, options);
    return this.forge({[this.prototype.idAttribute] : opts.id}).fetch(options).then(function(model){
      return model ? model.save(data, options) : undefined;
    });
  }
});



// Exports
module.exports = RssFeed;
