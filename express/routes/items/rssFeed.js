// RssFeed controller
const rssFeedController = rootRequire('express/controllers/items/rssFeed');
// Middlewares
const canAddRssFeed = rootRequire('express/middlewares/canAddRssFeed');
const createRssFeed = rootRequire('express/middlewares/createRssFeed');
const deleteRssFeed = rootRequire('express/middlewares/deleteRssFeed');
const deleteRssNewsOfRssFeed = rootRequire('express/middlewares/deleteRssNewsOfRssFeed');
const parseXmlResponse = rootRequire('express/middlewares/parseXmlResponse');
const requestForRssNews = rootRequire('express/middlewares/requestForRssNews');
const saveRssNews = rootRequire('express/middlewares/saveRssNews');
const updateRssFeed = rootRequire('express/middlewares/updateRssFeed');



// RssFeed routes
module.exports = function(router){

  // Create
  router.post(
    '/api/rssFeed',
    canAddRssFeed(),
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
    deleteRssFeed(),
    deleteRssNewsOfRssFeed(),
    rssFeedController.delete
  );

};
