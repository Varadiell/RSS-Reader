// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');



// DeleteRssNewsOfRssFeed
module.exports = function(){
  return function(req, res, next){
    RssNews.destroyByRssFeedId(req.itemRssFeed.id)
      .then(() => {
        next();
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
  };
};
