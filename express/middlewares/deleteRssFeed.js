// RssFeed
const RssFeed = rootRequire('express/models/rssFeed');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



// DeleteRssFeed
module.exports = function(){
  return function(req, res, next){
    RssFeed.destroyById(req.itemRssFeed.id)
      .then(() => {
        next();
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
  };
};
