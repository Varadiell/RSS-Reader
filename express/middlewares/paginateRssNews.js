// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssNews = rootRequire('express/models/rssNews');



// PaginateRssNews
module.exports = function(){
  return function(req, res, next){
    RssNews.paginate({'rssFeedId' : req.itemRssFeed.id}, req.pageQuery, req.pageSizeQuery).then(function(listRssNews){
      req.listRssNews = listRssNews;
      next();
    }).catch((err) => {
      next(errorHandler.newError(500, err));
    });
  };
};
