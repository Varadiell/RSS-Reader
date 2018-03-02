// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



// CreateRssFeed
module.exports = function(){
  return function(req, res, next){
    RssFeed.create({
      'url' : req.body.url
    }).then((rssFeed) => {
      req.itemRssFeed = rssFeed;
      next();
    }).catch((err) => {
      next(errorHandler.newError(500, err));
    });
  };
};
