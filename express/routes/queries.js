module.exports = function(router){

  // PageQuery
  router.use(function(req, res, next){
    const pageQuery = req.query.page;
    if(!pageQuery) return next();
    req.pageQuery = Number(pageQuery > 0 ? pageQuery : 1);
    next();
  });

  // PageSizeQuery
  router.use(function(req, res, next){
    const pageSizeQuery = req.query.pageSize;
    if(!pageSizeQuery) return next();
    req.pageSizeQuery = Number(pageSizeQuery ? pageSizeQuery : 20);
    next();
  });

};
