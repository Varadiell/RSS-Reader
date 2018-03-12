// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');
// Modules
const async = require('async');



// SaveRssNews
module.exports = function(){
  return function(req, res, next){
    // For each rssNews
    async.each(req.listRssNews, function(itemRssNews, callback){
      // Check by link if itemRssNews is already in database
      RssNews.findByLink(itemRssNews.link).then((rssNews) => {
        // Already in database, callback
        if(rssNews) return callback();
        // Not in database, save it
        RssNews.create(itemRssNews).then(() => {
          // Done for this rssNews
          callback();
        }).catch((err) => {
          next(errorHandler.newError(500, err));
        });
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
    }, function(){
      // Done with the list
      next();
    });
  };
};
