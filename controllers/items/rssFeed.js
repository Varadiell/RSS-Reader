// RssFeed
const RssFeed = rootRequire('models/rssFeed');



// Create
exports.create = function(req, res){
  RssFeed.create({
    'url' : 'https://www.judgehype.com/nouvelles.xml'
  }).then(function(){
    res.json({'success' : true});
  });
};

// Get
exports.get = function(req, res){
  res.json({
    'success' : true,
    'itemRssFeed' : req.itemRssFeed
  });
};

// GetAll
exports.getAll = function(req, res){
  RssFeed.findAll({}).then(function(rssFeeds){
    res.json({
      'success' : true,
      'listRssFeeds' : rssFeeds
    });
  });
};

// Update
exports.update = function(req, res){
  res.json({'success' : true});
};

// Delete
exports.delete = function(req, res){
  res.json({'success' : true});
};
