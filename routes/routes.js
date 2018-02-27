// Requires
const express = require('express');
const router = new express.Router();



// === PARAMS
rootRequire('routes/params')(router);

// === ITEMS
// RssFeed
rootRequire('routes/items/rssFeed')(router);



// Exports
module.exports = router;
