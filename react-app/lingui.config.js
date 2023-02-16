/** @type {import('@lingui/conf').LinguiConfig} */

module.exports = {
  locales: ["en", "zh"],
  sourceLocale: "en",
  catalogs: [{
    path: "src/locales/{locale}/messages",
    include: ["src"],
    exclude: ["**/node_modules/**"],
  }],
  format: "po"
}