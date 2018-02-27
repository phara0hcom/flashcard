const webpackDev = require("./webpack.dev.config.js"); // Dev
const webpackPro = require("./webpack.production.config.js"); // production
console.log("process.env.NODE_ENV >>", " -===" + process.env.NODE_ENV + "===-");
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "production "
) {
  console.log(" -=== production ===-");
  module.exports = webpackPro;
} else {
  console.log(" -=== DEV ===-");
  module.exports = webpackDev;
}
