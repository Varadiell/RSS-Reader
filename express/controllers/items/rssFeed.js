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
  res.json(req.listRssFeeds);
};

// Update
exports.update = function(req, res){
  res.json(req.itemRssFeed);
};

// Delete
exports.delete = function(req, res){
  res.json(true);
};
