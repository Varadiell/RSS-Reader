// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Variables
const RSS_FEEDS_LIMIT = 50;



// CanAddRssFeed
module.exports = function(){
  return function(req, res, next){
    RssFeed.count({}).then((count) => {
      if(count >= RSS_FEEDS_LIMIT) return next(errorHandler.newError(403, 'Too many rss feeds.'));
      next();
    }).catch((err) => {
      next(errorHandler.newError(500, err));
    });
  };
};
