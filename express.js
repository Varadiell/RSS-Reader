// Express
const express = require('express');
const app = express();

// Routes
app.get('/', function(req, res){
  res.send('Hello world!');
});

// Start listening
app.listen(3000, function(){
  console.info('Listening on port 3000...');
});
