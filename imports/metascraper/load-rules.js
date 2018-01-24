'use strict'

// const path = require('path')
// const cwd = process.env.METASCRAPER_CONFIG_CWD || process.cwd();

// console.log(Meteor.rootPath)

// const cwd = path.join(Meteor.rootPath, 'npm', 'imports', 'custom_node_modules')

// console.log(cwd)

// const cwd = '/imports/metascraper'
// const config = require('cosmiconfig')('metascraper').load(cwd)
// const resolveFrom = require('resolve-from')

var config;

const {
  findIndex,
  forEach,
  chain,
  isObject,
  isArray,
  isString,
  get
} = require('lodash')


import titleRule from './metascraper-title'
import logoRule from './metascraper-logo'

const rules = [
    titleRule(),
    logoRule()
]

console.log(titleRule)

let singletonConfig

module.exports = () => {
    singletonConfig = chain(rules)
      // merge rules with same props
      .reduce((acc, rules) => {
        forEach(rules, function (rule, propName) {
          const index = findIndex(acc, item => item[propName])
          
          if (index !== -1) {
            acc[index][propName] = acc[index][propName].concat(rule)
          } else {
            acc.push({ [propName]: rule })
          }
        })
        return acc
      }, [])
      // export an array interface, it's easier to iterate
      .map(obj => {
        console.log('obj', obj)
        const key = Object.keys(obj)[0]
        console.log('obj', obj)
        const value = obj[key]
        return [key, value]
      })
      .value()

    return singletonConfig
  }
