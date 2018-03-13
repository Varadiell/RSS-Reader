// Get
exports.get = function(req, res){
  res.json(req.itemRssNews);
};

// Paginate
exports.paginate = function(req, res){
  res.json({
    'count' : req.pagination.count,
    'listRssNews' : req.listRssNews
  });
};

// Refresh
exports.refresh = function(req, res){
  res.json(true);
};

// SetFavorite
exports.setFavorite = function(req, res){
  res.json(true);
};

// UnsetFavorite
exports.unsetFavorite = function(req, res){
  res.json(true);
};
