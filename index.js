const key = process.env.VIEWS_E2E_TEST_ID || "data-test-id";

const get = (id, ...scopes) => () => {
  const el = browser.element(`[${key}*="${id}|"]`);

  scopes.forEach(scope => {
    el[scope] = () =>
      browser.element(`[${key}*="${id}|"][${key}*="${scope}|"]`);
  });

  return el;
};

module.exports = {
  get
};
