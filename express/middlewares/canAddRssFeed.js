// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssFeed = rootRequire('express/models/rssFeed');
// Modules
const async = require('async');
const isUrl = require('is-url');
// Variables
const RSS_FEEDS_LIMIT = 50;



// CanAddRssFeed
module.exports = function(){
  return function(req, res, next){
    async.series({
      // IsNotLimited
      isNotLimited(callback){
        RssFeed.count({})
          .then((count) => {
            if(count >= RSS_FEEDS_LIMIT) return callback(errorHandler.newError(403, 'Too many rss feeds.'));
            callback();
          }).catch((err) => {
            callback(errorHandler.newError(500, err));
          });
      },
      // IsValidUrl
      isValidUrl(callback){
        if(!isUrl(req.body.url)) return callback(errorHandler.newError(400, 'Invalid URL.'));
        callback();
      },
      // IsUniqueUrl
      isUniqueUrl(callback){
        RssFeed.findByUrl(req.body.url)
          .then((rssFeed) => {
            if(rssFeed) return callback(errorHandler.newError(403, 'RssFeed already added.'));
            callback();
          }).catch((err) => {
            callback(errorHandler.newError(500, err));
          });
      }
    }, function(err){
      if(err) return next(err);
      next();
    });
  };
};
