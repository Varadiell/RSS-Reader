// Controller
const rssNewsController = rootRequire('express/controllers/items/rssNews');
// Middlewares
const countRssNews = rootRequire('express/middlewares/countRssNews');
const countRssNewsFavorites = rootRequire('express/middlewares/countRssNewsFavorites');
const paginateRssNews = rootRequire('express/middlewares/paginateRssNews');
const paginateRssNewsFavorites = rootRequire('express/middlewares/paginateRssNewsFavorites');
const parseXmlResponse = rootRequire('express/middlewares/parseXmlResponse');
const requestForRssNews = rootRequire('express/middlewares/requestForRssNews');
const saveRssNews = rootRequire('express/middlewares/saveRssNews');
const setFavoriteRssNews = rootRequire('express/middlewares/setFavoriteRssNews');
const updateRssFeed = rootRequire('express/middlewares/updateRssFeed');
const updateRssNews = rootRequire('express/middlewares/updateRssNews');
const unsetFavoriteRssNews = rootRequire('express/middlewares/unsetFavoriteRssNews');



// RssNews routes
module.exports = function(router){

  // PaginateFavorites
  router.get(
    '/api/rssNews/favorites',
    countRssNewsFavorites(),
    paginateRssNewsFavorites(),
    rssNewsController.paginateFavorites
  );

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

  // SetFavorite
  router.put(
    '/api/rssNews/:rssNewsId/favorite',
    setFavoriteRssNews(),
    updateRssNews(),
    rssNewsController.setFavorite
  );

  // UnsetFavorite
  router.delete(
    '/api/rssNews/:rssNewsId/favorite',
    unsetFavoriteRssNews(),
    updateRssNews(),
    rssNewsController.unsetFavorite
  );

};
