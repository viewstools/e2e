const key = process.env.VIEWS_E2E_TEST_ID || 'data-test-id';

const get = (id, ...scopes) => ({ all = false, $in = browser, index } = {}) => {
  const idSelector = `[${key}*="${id}|"]`;

  const getElBySelector = selector => {
    if (typeof index === 'number') {
      // get item from list by index
      el = $in.elements(selector).value[index];
    } else if (all) {
      // get all items from list
      el = $in.elements(selector).value;
    } else {
      el = $in.element(selector);
    }
  };

  getElBySelector(idSelector);

  scopes.forEach(scope => {
    el[scope] = () => {
      getElBySelector(`${idSelector}[${key}*="${scope}|"`);
    };
  });

  return el;
};

module.exports = {
  get,
};
