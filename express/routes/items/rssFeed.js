// RssFeed controller
const rssFeedController = rootRequire('express/controllers/items/rssFeed');



// RssFeed routes
module.exports = function(router){

  // Create
  router.post(
    '/api/rssFeed/create',
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
    '/api/rssFeed/:rssFeedId/update',
    rssFeedController.update
  );

  // Delete
  router.delete(
    '/api/rssFeed/:rssFeedId/delete',
    rssFeedController.delete
  );

};
