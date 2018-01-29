'use strict'

const { titleize } = require('../helpers')
const { isString } = require('lodash')

const wrap = rule => ({ htmlDom }) => {
  const value = rule(htmlDom)
  return isString(value) && titleize(value)
}

function isStringAndShort(value) {
  return isString(value) && stringIsShort(value);
}

function stringIsShort(string) {
  if (string.length < 200) {
    return true;
  } else {
    return false;
  }
}

const wrapShort = rule => ({ htmlDom }) => {
  const value = rule(htmlDom)
  return isStringAndShort(value) && titleize(value)
}

module.exports = {
  title: [
    wrapShort($ => $('meta[property="dpg:title"]').attr('content')),
    wrapShort($ => $('meta[property="og:title"]').attr('content')),
    wrapShort($ => $('meta[name="twitter:title"]').attr('content')),
    wrapShort($ => $('meta[name="sailthru.title"]').attr('content')),
    wrapShort($ => $('.post-title').text()),
    wrapShort($ => $('.entry-title').text()),
    wrapShort($ => $('[itemtype="http://schema.org/BlogPosting"] [itemprop="name"]').text()),
    wrapShort($ => $('h1[class*="title"] a').text()),
    wrapShort($ => $('h1[class*="title"]').text()),
    wrapShort($ => $('title').text()),
    wrap($ => $('meta[property="og:title"]').attr('content')),
    wrap($ => $('meta[name="twitter:title"]').attr('content')),
    wrap($ => $('meta[name="sailthru.title"]').attr('content')),
    wrap($ => $('.post-title').text()),
    wrap($ => $('.entry-title').text()),
    wrap($ => $('[itemtype="http://schema.org/BlogPosting"] [itemprop="name"]').text()),
    wrap($ => $('h1[class*="title"] a').text()),
    wrap($ => $('h1[class*="title"]').text()),
    wrap($ => $('title').text())
  ]
}
