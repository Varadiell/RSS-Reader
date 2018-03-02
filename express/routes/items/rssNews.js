// RssNews controller
const rssNewsController = rootRequire('express/controllers/items/rssNews');



// RssNews routes
module.exports = function(router){

  // Get
  router.get(
    '/api/rssNews/:rssNewsId',
    rssNewsController.get
  );

  // GetAll
  router.get(
    '/api/rssFeed/:rssFeedId/news',
    rssNewsController.getAll
  );

};
