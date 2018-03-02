// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



// UpdateRssFeed
module.exports = function(){
  return function(req, res, next){
    RssFeed.update(req.itemRssFeed.id, req.updatedRssFeed).then((rssFeed) => {
      req.itemRssFeed = rssFeed;
      next();
    }).catch((err) => {
      next(errorHandler.newError(500, err));
    });
  };
};
