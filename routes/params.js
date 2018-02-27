// Functions
const errorHandler = rootRequire('functions/errorHandler');
// Models
const RssFeed = rootRequire('models/rssFeed');



module.exports = function(router){

  // RssFeed
  router.param('rssFeedId', function(req, res, next, rssFeedId){
    RssFeed.findById(rssFeedId).then(function(rssFeed){
      if(!rssFeed) return next(errorHandler.newError(404, 'RssFeed not found.'));
      req.itemRssFeed = rssFeed;
      next();
    });
  });

};
