// Error response
module.exports = function(err, req, res, next){
  // Error status (default 500)
  err.status = err.status || 500;
  // Status response
  res.status(err.status);
  // No stacktrace if not in development environment or err.status is not 500
  if(req.app.node_env !== 'development' || err.status !== 500) err.stack = undefined;
  // Response object
  const response = {
    'status' : err.status,
    'message' : err.message,
    'stack' : err.stack
  };
  res.send(response);
  next();
};
