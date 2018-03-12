// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Models
const RssFeed = rootRequire('express/models/rssFeed');



// FindAllRssFeeds
module.exports = function(){
  return function(req, res, next){
    RssFeed.findAll({})
      .then(function(listRssFeeds){
        req.listRssFeeds = listRssFeeds;
        next();
      }).catch((err) => {
        next(errorHandler.newError(500, err));
      });
  };
};
