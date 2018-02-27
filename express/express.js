// Modules
const express = require('express');
const path = require('path');

// Express
const app = express();

// Start listening
app.listen(3000, function(){
  console.info('Listening on port 3000...');
});

// SQLite3 initialization
app.use(rootRequire('middlewares/sqliteInit'));

const RssFeed = rootRequire('models/rssFeed');

app.use(function(req, res, next){
  // Test find (by id)
  RssFeed.findById(1).then(function(rssFeed){
    console.info(rssFeed);
  });
  // Test create
  const newRssFeed = {
    'url' : 'https://www.judgehype.com/nouvelles.xml'
  };
  RssFeed.create(newRssFeed).then(function(){
    console.info('New "rssFeed" item created');
  }).catch(function(err){
    console.info('Error : "rssFeed" item creation failed.');
    console.info(err);
  });
  next();
});

// Serve views folder (dist)
app.use('', express.static(path.join(__dirname, '../dist')));

// 404
app.use(function(req, res, next){
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error
app.use(function(err, req, res){
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page.
  res.status(err.status || 500);
  res.send('error : ' + err.status);
});
