// RssNews
const RssNews = rootRequire('express/models/rssNews');



// CountRssNews
module.exports = function(){
  return function(req, res, next){
    RssNews.count({'rssFeedId' : req.itemRssFeed.id}).then(function(count){
      req.pagination = {
        'count' : count
      };
      next();
    });
  };
};
