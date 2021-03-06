// Config
const expressConfig = rootRequire('express/config/express');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Modules
const async = require('async');
const express = require('express');
const fs = require('fs');
const path = require('path');



module.exports = function(callback){

  // Express
  const app = express();

  // =================================================================

  // Body parser
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    'extended' : false // Security issues if "true"
  }));

  // Serve angular "distAngular" folder
  app.use(express.static(path.join(__dirname, '../distAngular')));

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
    // Environment (node_env)
    environment(callback){
      app.set('node_env', (process.env.NODE_ENV || 'production').trim());
      callback();
    },
    // Create sqlite3 folder
    sqlite3_folder(callback){
      const dir = './sqlite3';
      // eslint-disable-next-line
      if(!fs.existsSync(dir)){
        // eslint-disable-next-line
        fs.mkdirSync(dir);
      }
      callback();
    },
    // SQLite3 initialization
    sqlite3_init(callback){
      rootRequire('express/functions/sqliteInit');
      callback();
    },
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
