// RssFeed controller
const rssFeedController = rootRequire('express/controllers/items/rssFeed');
// Middlewares
const createRssFeed = rootRequire('express/middlewares/createRssFeed');
const parseXmlResponse = rootRequire('express/middlewares/parseXmlResponse');
const requestForRssNews = rootRequire('express/middlewares/requestForRssNews');
const saveRssNews = rootRequire('express/middlewares/saveRssNews');
const updateRssFeed = rootRequire('express/middlewares/updateRssFeed');



// RssFeed routes
module.exports = function(router){

  // Create
  router.post(
    '/api/rssFeed',
    createRssFeed(),
    requestForRssNews(),
    parseXmlResponse(),
    updateRssFeed(),
    saveRssNews(),
    rssFeedController.create
  );

  // Get
  router.get(
    '/api/rssFeed/:rssFeedId',
    rssFeedController.get
  );

  // GetAll
  router.get(
    '/api/rssFeeds',
    rssFeedController.getAll
  );

  // Update
  router.put(
    '/api/rssFeed/:rssFeedId',
    rssFeedController.update
  );

  // Delete
  router.delete(
    '/api/rssFeed/:rssFeedId',
    rssFeedController.delete
  );

};
