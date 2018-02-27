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

// Environment (node_env)
app.set('node_env', (process.env.NODE_ENV || 'development').trim());

// Port
app.set('port', expressConfig.port);

// Views
app.set('views', path.join(__dirname, '../dist'));
app.use('', express.static(path.join(__dirname, '../dist')));

// SQLite3 initialization
rootRequire('functions/sqliteInit');

// Start listening
app.listen(app.get('port'), function(){
  console.info('Listening on port %s.', app.get('port'));
});

// =================================================================

// Routes
app.use(rootRequire('routes/routes'));

// 404, page not found.
app.use(function(req, res, next){
  next(errorHandler.newError(404, 'Page not found.'));
});

// Error response
app.use(rootRequire('middlewares/errorResponse'));



// Exports
module.exports = app;
