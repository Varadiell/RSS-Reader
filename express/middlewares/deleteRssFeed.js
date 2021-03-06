// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssFeed = rootRequire('express/models/rssFeed');



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
