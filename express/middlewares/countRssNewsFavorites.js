// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');



// CountRssNewsFavorites
module.exports = function(){
  return function(req, res, next){
    RssNews.count({'isFavorite' : true})
      .then(function(count){
        req.pagination = {
          'count' : count
        };
        next();
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
  };
};
