// unsetFavoriteRssNews
module.exports = function(){
  return function(req, res, next){
    req.updatedRssNews = {
      'isFavorite' : false
    };
    next();
  };
};
