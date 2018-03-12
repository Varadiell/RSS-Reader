// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssFeed = rootRequire('express/models/rssFeed');
// Modules
const async = require('async');
const isUrl = require('is-url');



// ParseRssFeedChanges
module.exports = function(){
  return function(req, res, next){
    async.series({
      // CreateUpdatedRssFeed
      createUpdatedRssFeed(callback){
        req.updatedRssFeed = {};
        callback();
      },
      // IsValidUrl
      isValidUrl(callback){
        if(!isUrl(req.body.url)) return callback(errorHandler.newError(400, 'Invalid URL.'));
        callback();
      },
      // IsUniqueUrl
      isUniqueUrl(callback){
        if(req.itemRssFeed.attributes.url === req.body.url) return callback();
        RssFeed.findByUrl(req.body.url)
          .then((rssFeed) => {
            if(rssFeed) return callback(errorHandler.newError(403, 'RssFeed URL already exists.'));
            callback();
          }).catch((err) => {
            callback(errorHandler.newError(500, err));
          });
      },
      // UpdateURL
      updateURL(callback){
        req.updatedRssFeed.url = req.body.url;
        callback();
      }
    }, function(err){
      if(err) return next(err);
      next();
    });
  };
};
