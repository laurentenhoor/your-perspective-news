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

function isDumpert(htmlDom) {
  let applicationName = $('meta[name="application-name"]').attr('content');
  console.log(applicationName)
  console.log(applicationName == "Dumpert")
  
  return (applicationName == "Dumpert")
}

module.exports = {
  embed : [
    wrapYoutube($ => $('meta[name="twitter:player"]').attr('content')),
    ($, url) => (isString(url) ? url : null)
  ]
}