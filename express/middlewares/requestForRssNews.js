// Modules
const http = require('http');
const https = require('https');
// Functions
const errorHandler = rootRequire('express/functions/errorHandler');



// RequestForRssNews
module.exports = function(){
  return function(req, res, next){
    // RssFeed url to request
    const url = req.itemRssFeed.attributes.url;
    // Http or Https request
    const requester = getRequester(url);
    // Get request with an adapted requester
    requester.get(url, function(requestResponse){
      // Invalid content type
      if(requestResponse.headers['content-type'] !== 'application/xml' && requestResponse.headers['content-type'] !== 'text/xml')
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
