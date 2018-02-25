// Modules
const express = require('express');
const path = require('path');

// Express
const app = express();

// Start listening
app.listen(3000, function(){
  console.info('Listening on port 3000...');
});

// Serve views folder (dist)
app.use('', express.static(path.join(__dirname, 'dist')));

// 404
app.use(function(req, res, next) {
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
