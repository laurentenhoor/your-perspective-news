'use strict'

const getVideoId = require('get-video-id')

const { getValue, isUrl, titleize } = require('../helpers')
const { isString } = require('lodash')

const getThumbnailUrl = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

const getVideo = url => getVideoId(url) || {}

const wrapYoutube = rule => ({ url, htmlDom }) => {

  const value = rule(htmlDom)
  return getVideo(url) && value;
  
}

function getDumpertEmbedUrl(url) {

  var urlParts = url.split("/");
  var mediabaseIndex = -1;
  _.each(urlParts, (part, index) => {
    if (part.indexOf('mediabase') > -1) {
      mediabaseIndex = index;
    }
  })

  return 'http://www.dumpert.nl/embed/'+ 
    urlParts[mediabaseIndex+1]+'/'+
    urlParts[mediabaseIndex+2]
  
}

function isDumpertVideo($) {

  let appName = $.htmlDom('meta[name="application-name"]').attr('content');
  let mediaType = $.htmlDom('meta[property="og:type"]').attr('content');
  return (appName == "Dumpert") && (mediaType == "video");

}

module.exports = {
  videoUrl : [
    wrapYoutube($ => $('meta[name="twitter:player"]').attr('content')),
    ($) => {
      return isDumpertVideo($) && getDumpertEmbedUrl($.url)
    }
  ]
}