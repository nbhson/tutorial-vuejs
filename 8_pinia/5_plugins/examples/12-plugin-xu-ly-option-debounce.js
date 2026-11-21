import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (!options.debounce) return

  return Object.keys(options.debounce).reduce((result, actionName) => {
    result[actionName] = debounce(store[actionName], options.debounce[actionName])
    return result
  }, {})
})
