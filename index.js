const key = process.env.VIEWS_E2E_TEST_ID || 'data-test-id'

const getElBySelector = ($in, selector, index, all) => {
  let el
  if (typeof index === 'number') {
    // get item from list by index
    el = $in.elements(selector).value[index]
  } else if (all) {
    // get all items from list
    el = $in.elements(selector).value
  } else {
    el = $in.element(selector)
  }
  return el
}

const get = (id, ...scopes) => ({ all = false, $in = browser, index } = {}) => {
  const idSelector = `[${key}*="${id}|"]`

  let el = getElBySelector($in, idSelector, index, all)

  scopes.forEach(scope => {
    el[scope] = () =>
      getElBySelector($in, `${idSelector}[${key}*="${scope}|"`, index, all)
  })

  return el
}

module.exports = {
  get,
}
