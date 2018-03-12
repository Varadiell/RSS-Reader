// Modules
const async = require('async');
const express = require('express');
const path = require('path');
// Config
const expressConfig = rootRequire('express/config/express');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



module.exports = function(callback){

  // Express
  const app = express();

  // =================================================================

  // Environment (node_env)
  app.set('node_env', (process.env.NODE_ENV || 'development').trim());

  // SQLite3 initialization
  rootRequire('express/functions/sqliteInit');

  // Body parser
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    'extended' : false // Security issues if "true"
  }));

  // Serve angular "dist" folder
  app.use(express.static(path.join(__dirname, '../dist')));

  // Serve express "public" folder
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // =================================================================

  // Routes
  app.use(rootRequire('express/routes/routes'));

  // 404, page not found.
  app.use(function(req, res, next){
    next(errorHandler.newError(404, 'Page not found.'));
  });

  // Error response
  app.use(rootRequire('express/middlewares/errorResponse'));

  // =================================================================

  async.series({
    // Port
    port(callback){
      const getPort = require('get-port');
      getPort({'port' : expressConfig.port}).then((port) => {
        app.set('port', port);
        callback();
      });
    },
    // Start listening
    listen(callback){
      app.listen(app.get('port'), function(){
        console.info('Listening on port %s.', app.get('port'));
        callback();
      });
    }
  }, function(err){
    callback(err, app);
  });
};
