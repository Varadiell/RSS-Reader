// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');



// UpdateRssNews
module.exports = function(){
  return function(req, res, next){
    RssNews.update(req.itemRssNews.id, req.updatedRssNews)
      .then((rssNews) => {
        req.itemRssNews = rssNews;
        next();
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
  };
};
