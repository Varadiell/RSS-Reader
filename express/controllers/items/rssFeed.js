// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');



// Create
exports.create = function(req, res){
  res.json(req.itemRssFeed);
};

// Get
exports.get = function(req, res){
  res.json(req.itemRssFeed);
};

// GetAll
exports.getAll = function(req, res){
  RssFeed.findAll({}).then(function(listRssFeeds){
    res.json(listRssFeeds);
  });
};

// Update
exports.update = function(req, res){
  RssFeed.update(req.itemRssFeed.id, {
    'url' : req.body.url
  }).then(function(rssFeed){
    res.json(rssFeed);
  });
};

// Delete
exports.delete = function(req, res){
  res.json();
};
