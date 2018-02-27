// Modules
const express = require('express');
const path = require('path');
// Config
const expressConfig = rootRequire('config/express');
// Functions
const errorHandler = rootRequire('functions/errorHandler');



// Express
const app = express();

// =================================================================

// Environment
app.set('node_env', (process.env.NODE_ENV || 'development').trim());

// Views
app.set('views', path.join(__dirname, '../dist'));
app.use('', express.static(path.join(__dirname, '../dist')));

// SQLite3 initialization
app.use(rootRequire('middlewares/sqliteInit'));

// Start listening
app.listen(expressConfig.port, function(){
  console.info('Listening on port %s...', expressConfig.port);
});

// =================================================================

// Routes
app.use(rootRequire('routes/routes'));

// 404, page not found.
app.use(function(req, res, next){
  next(errorHandler.newError(404, 'Page not found.'));
});

// Manage errors (no stacktrace in production)
app.use(function(err, req, res){
  // Error status (default 500)
  err.status = err.status || 500;
  // Status response
  res.status(err.status);
  // No stacktrace if not in development environment or err.status is not 500
  if(app.get('node_env') !== 'development' || err.status !== 500) err.stack = undefined;
  // Response object
  const response = {
    'success' : false,
    'error' : {
      'status' : err.status,
      'message' : err.message,
      'stack' : err.stack
    }
  };
  res.send(response);
});



// Exports
module.exports = app;
