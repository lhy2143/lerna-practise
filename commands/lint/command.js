exports.command = "lint init";

exports.describe =
  "Generate the config files to lint your project and set the specification of commit.[.eslintrc.js,.prettierrc,.vscode/settings.json and some others]";

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
  require("./bin/index");
};
