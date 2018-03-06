// Modules
const _ = require('lodash');
const http = require('http');
const https = require('https');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



// RequestForRssNews
module.exports = function(){
  return function(req, res, next){
    // RssFeed url to request
    const url = req.itemRssFeed.attributes.url;
    // Get request with an adapted requester (Http or Https)
    getRequester(url).get(url, function(requestResponse){
      // Invalid content type
      const contentType = _.get(requestResponse, 'headers["content-type"]');
      if(contentType && contentType.indexOf('xml') === -1)
        return next(errorHandler.newError(415, 'Invalid content type.'));
      // Service unavailable
      if(requestResponse.statusCode !== 200)
        return next(errorHandler.newError(503, `Service unavailable : responded with status ${requestResponse.statusCode}.`));
      // Encoding
      requestResponse.setEncoding('utf8');
      // Store XML response
      let xml = '';
      requestResponse.on('data', (chunk) => {xml += chunk;});
      requestResponse.on('end', () => {
        req.xmlResponse = xml;
        next();
      });
    });
  };
};

// Return an adapted requester for Http or Https requests
function getRequester(url){
  if(url.indexOf('https') === 0) return https;
  return http;
}
