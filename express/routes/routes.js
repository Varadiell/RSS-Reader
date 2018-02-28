// Requires
const express = require('express');
const router = new express.Router();



// === PARAMS
rootRequire('express/routes/params')(router);

// === ITEMS
// RssFeed
rootRequire('express/routes/items/rssFeed')(router);

// === INDEX (GET redirect)
rootRequire('express/routes/index')(router);



// Exports
module.exports = router;
