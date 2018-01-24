'use strict'

const getVideoId = require('get-video-id')

const { getValue, isUrl, titleize } = require('../helpers')
const { isString } = require('lodash')

const getThumbnailUrl = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

const getVideo = url => getVideoId(url) || {}

const wrap = rule => ({ url, htmlDom }) => {
  const value = rule(htmlDom)
  return getVideo(url) && value;
}

module.exports = {
  embed : [
    wrap($ => $('meta[name="twitter:player"]').attr('content'))
  ]
}