// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssFeed = rootRequire('express/models/rssFeed');
const RssNews = rootRequire('express/models/rssNews');


module.exports = function(router){

  // RssFeed
  router.param('rssFeedId', function(req, res, next, rssFeedId){
    RssFeed.findById(rssFeedId).then(function(rssFeed){
      if(!rssFeed) return next(errorHandler.newError(404, 'RssFeed not found.'));
      req.itemRssFeed = rssFeed;
      next();
    });
  });

  // RssNews
  router.param('rssNewsId', function(req, res, next, rssNewsId){
    RssNews.findById(rssNewsId).then(function(rssNews){
      if(!rssNews) return next(errorHandler.newError(404, 'RssNews not found.'));
      req.itemRssNews = rssNews;
      next();
    });
  });

};
