const { spawn } = require("child_process");
const path = require("path");
exports.command = "scan [port]";

exports.describe = `Scan the client project and static and compute the statistics of UCF3 API's usage.
this will start a local service to show you the report and the default port is 8090,or you can specify the port by youself`;

exports.builder = {
  exact: {
    describe:
      "Specify lerna dependency version in package.json without a caret (^)",
    type: "boolean",
  },
  independent: {
    describe: "Version packages independently",
    alias: "i",
    type: "boolean",
  },
};

exports.handler = function handler(argv) {
  let port = argv.port;
  // 因为安装包server在 node_modules\@commands\scan\deleteComments\server.js 目录下
  spawn("node", [path.resolve(__dirname, "./deleteComments/server.js"), port], {
    stdio: "inherit",
  });
};
const { default: scandir, defaultFilesystem } = require("./lib/cjs/index.js");

exports.default = scandir;
exports.defaultFilesystem = defaultFilesystem;
