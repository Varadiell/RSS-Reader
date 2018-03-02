// RssNews controller
const rssNewsController = rootRequire('express/controllers/items/rssNews');
// Middlewares
const requestForRssNews = rootRequire('express/middlewares/requestForRssNews');
const parseXmlResponse = rootRequire('express/middlewares/parseXmlResponse');
const saveRssNews = rootRequire('express/middlewares/saveRssNews');
const updateRssFeed = rootRequire('express/middlewares/updateRssFeed');



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
    requestForRssNews(),
    parseXmlResponse(),
    updateRssFeed(),
    saveRssNews(),
    rssNewsController.getAll
  );

};
