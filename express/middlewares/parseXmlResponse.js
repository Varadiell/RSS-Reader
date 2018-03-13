// Functions
const errorHandler = rootRequire('express/functions/errorHandler');
// Modules
const _ = require('lodash');
const entities = require('entities');
const striptags = require('striptags');
const xml2js = require('xml2js');
// Variables
const RSSNEWS_ADD_LIMIT = 20;



// ParseXmlResponse
module.exports = function(){
  return function(req, res, next){
    // Parse XML into javascript object
    xml2js.parseString(req.xmlResponse, function(err, parsedXml){
      // Invalid XML
      if(err) return next(errorHandler.newError(415, 'Invalid XML.'));
      // Channel infos
      const channel = _.get(parsedXml, 'rss.channel');
      if(!channel) return next(errorHandler.newError(415, 'Invalid XML.'));
      // UpdatedRssFeed (for middleware updatedRssFeed)
      req.updatedRssFeed = {
        'description' : _.get(channel, '[0].description[0]'),
        'image' : _.get(channel, '[0].image[0].url[0]'),
        'link' : _.get(channel, '[0].link[0]'),
        'title' : _.get(channel, '[0].title[0]')
      };
      // ListRssNews (for middleware saveRssNews)
      const listRssNews = [];
      _.forEach(_.get(channel, '[0].item'), function(e){
        if(listRssNews.length >= RSSNEWS_ADD_LIMIT) return;
        // Handle pubDate
        let pubDate = Date.parse(_.get(e, 'pubDate[0]'));
        if(isNaN(pubDate)) pubDate = Date.now();
        // Push into listRssNews
        listRssNews.push({
          'rssFeedId' : req.itemRssFeed.id,
          'description' : entities.decodeHTML(striptags(_.get(e, 'description[0]'))),
          'isFavorite' : false,
          'link' : _.get(e, 'link[0]'),
          'pubDate' : pubDate,
          'title' : _.get(e, 'title[0]')
        });
      });
      req.listRssNews = listRssNews;
      next();
    });
  };
};
