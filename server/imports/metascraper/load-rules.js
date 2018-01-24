const rules = [
    require('./rules/embed'),
    require('./rules/author'),
    require('./rules/date'),
    require('./rules/description'),
    require('./rules/image'),
    require('./rules/lang'),
    require('./rules/logo'),
    require('./rules/publisher'),
    require('./rules/title'),
    require('./rules/url'),
]

module.exports = () => {
  return _.chain(rules)
      // merge rules with same props
      .reduce((acc, rules) => {
        _.forEach(rules, function (rule, propName) {
          
          const index = _.findIndex(acc, item => item[propName])
          
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

        const key = Object.keys(obj)[0]
        const value = obj[key]
        
        return [key, value]

      })
      .value()
  }
