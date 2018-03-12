// RssNews
const RssNews = rootRequire('express/models/rssNews');



// PaginateRssNews
module.exports = function(){
  return function(req, res, next){
    RssNews.paginate({'rssFeedId' : req.itemRssFeed.id}, req.pageQuery, req.pageSizeQuery).then(function(listRssNews){
      req.listRssNews = listRssNews;
      next();
    });
  };
};
