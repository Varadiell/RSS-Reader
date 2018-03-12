// Controller
const rssNewsController = rootRequire('express/controllers/items/rssNews');
// Middlewares
const countRssNews = rootRequire('express/middlewares/countRssNews');
const paginateRssNews = rootRequire('express/middlewares/paginateRssNews');
const parseXmlResponse = rootRequire('express/middlewares/parseXmlResponse');
const requestForRssNews = rootRequire('express/middlewares/requestForRssNews');
const saveRssNews = rootRequire('express/middlewares/saveRssNews');
const updateRssFeed = rootRequire('express/middlewares/updateRssFeed');



// RssNews routes
module.exports = function(router){

  // Get
  router.get(
    '/api/rssNews/:rssNewsId',
    rssNewsController.get
  );

  // Paginate
  router.get(
    '/api/rssFeed/:rssFeedId/news',
    countRssNews(),
    paginateRssNews(),
    rssNewsController.paginate
  );

  // Refresh
  router.get(
    '/api/rssFeed/:rssFeedId/news/refresh',
    requestForRssNews(),
    parseXmlResponse(),
    updateRssFeed(),
    saveRssNews(),
    rssNewsController.refresh
  );

};
