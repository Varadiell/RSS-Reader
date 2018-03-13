// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');



// PaginateRssNewsFavorites
module.exports = function(){
  return function(req, res, next){
    RssNews.paginate({'isFavorite' : true}, req.pageQuery, req.pageSizeQuery).then(function(listRssNews){
      req.listRssNews = listRssNews;
      next();
    }).catch((err) => {
      next(errorHandler.newError(500, err));
    });
  };
};
