// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');



// Create
exports.create = function(req, res){
  RssFeed.create({
    'url' : 'https://www.judgehype.com/nouvelles.xml'
  }).then(function(){
    res.json();
  });
};

// Get
exports.get = function(req, res){
  res.json(req.itemRssFeed);
};

// GetAll
exports.getAll = function(req, res){
  RssFeed.findAll({}).then(function(rssFeeds){
    res.json(rssFeeds);
  });
};

// Update
exports.update = function(req, res){
  res.json();
};

// Delete
exports.delete = function(req, res){
  res.json();
};
