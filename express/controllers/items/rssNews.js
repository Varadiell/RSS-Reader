// RssNews
const RssNews = rootRequire('express/models/rssNews');



// Get
exports.get = function(req, res){
  res.json(req.itemRssNews);
};

// GetAll
exports.getAll = function(req, res){
  RssNews.findAll({'rssFeedId' : req.itemRssFeed.id}).then(function(listRssNews){
    res.json(listRssNews);
  });
};
