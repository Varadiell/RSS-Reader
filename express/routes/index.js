// Modules
const path = require('path');



// Index
module.exports = function(router){

  // Redirection to angular index.html for GET requests
  router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

};
