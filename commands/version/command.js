exports.command = "version";

exports.describe =
  "manage the version of your project.this will read the version field in package.json file where you execute the command.";

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
  require("./publish");
};
