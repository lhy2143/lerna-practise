#!/usr/bin/env node

'use strict';
const enquirer = require('enquirer');

function getErrorMessage(error) {
  // Lazy loading because those are used only if error happened.
  const fs = require('fs');
  const path = require('path');
  const util = require('util');
  const lodash = require('lodash');

  // Foolproof -- thirdparty module might throw non-object.
  if (typeof error !== 'object' || error === null) {
    return String(error);
  }

  // Use templates if `error.messageTemplate` is present.
  if (typeof error.messageTemplate === 'string') {
    try {
      const templateFilePath = path.resolve(
        __dirname,
        `../messages/${error.messageTemplate}.txt`
      );

      // Use sync API because Node.js should exit at this tick.
      const templateText = fs.readFileSync(templateFilePath, 'utf-8');
      const template = lodash.template(templateText);

      return template(error.messageData || {});
    } catch {
      // Ignore template error then fallback to use `error.stack`.
    }
  }

  // Use the stacktrace if it's an error object.
  if (typeof error.stack === 'string') {
    return error.stack;
  }

  // Otherwise, dump the object.
  return util.format('%o', error);
}
function onFatalError(error) {
  process.exitCode = 2;

  const { version } = require('../package.json');
  const message = getErrorMessage(error);

  console.error(`
Oops! Something went wrong! :(

ESLint: ${version}

${message}`);
}

(async function main() {
  if (process.argv.includes('init')) {
    enquirer
      .prompt([
        {
          type: 'toggle',
          name: 'typescript',
          message: 'Does your project use TypeScript?',
          enabled: 'Yes',
          disabled: 'No',
          initial: 0,
        },
        {
          type: 'toggle',
          name: 'commit',
          message: 'Does your project need a commit specifications?',
          enabled: 'Yes',
          disabled: 'No',
          initial: 0,
        },
        {
          type: 'select',
          name: 'framework',
          message: 'What framework does your project use?',
          initial: 0,
          choices: [
            { name: 'react', value: 'react' },
            { name: 'vue', value: 'vue' },
            { name: 'none', value: 'none' },
          ],
        },
      ])
      .then(async (answers) => {
        await require('./init.js').initialize(answers);
      });
    return;
  } else {
    console.log(`the argv must be init,please use 'fip lint init'`);
  }
})().catch(onFatalError);
