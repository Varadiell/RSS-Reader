// RssNews
const RssNews = rootRequire('express/models/rssNews');



// Get
exports.get = function(req, res){
  res.json(req.itemRssNews);
};

// GetAll
exports.getAll = function(req, res){
  RssNews.paginate({'rssFeedId' : req.itemRssFeed.id}, req.pageQuery, req.pageSizeQuery).then(function(listRssNews){
    res.json(listRssNews);
  });
};

// Refresh
exports.refresh = function(req, res){
  res.json({'success' : true});
};
