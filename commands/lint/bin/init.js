/**
 * 代码规范
 * 1、自动生成对应的配置文件(文件检测) initialize
 * .vscode/setting.json .prettierrc .eslintrc.js .editorconfig
 * 2、提示用户安装对应插件(插件检测)
 * EditorConfig for VS Code ESLint Prettier - Code formatter
 *
 * 2、提示用户安装对应库(依赖检测),是否使用typescript影响需要安装的包
 * npm install prettier eslint eslint-config-prettier -D
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const shell = require('shelljs');
const chalk = require('chalk');
const util = require('util');

const cliProgress = require('cli-progress');
const { cwd } = require('process');
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

const codeBaseConfigPath = path.resolve(__dirname, '../config/code');
const commitBaseConfigPath = path.resolve(__dirname, '../config/commit');
const packageJsonPath = path.resolve(cwd(), './package.json');
const typescriptDep = [
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'typescript',
];
let lintDep = [
  'prettier',
  'eslint',
  'eslint-config-prettier',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
];

let frameworkDep = 'eslint-plugin-';

let typescript = false;
let framework = 'none';
let log = console.log;

function getConfigList(path) {
  const data = fs.readdirSync(path);
  return data.map((item) => {
    let info = fs.statSync(`${path}/${item}`);
    if (info.isDirectory()) {
      return getConfigList(`${path}/${item}`);
    } else {
      return `${path}/${item}`;
    }
  });
}
function write(filename, filePath, typePath) {
  fs.promises
    .readFile(`${typePath}/${filename}`)
    .then((data) => {
      let result = data.toString();
      // 根据选择动态修改.eslintrc.js的内容
      if (filename === '.eslintrc.js') {
        if (!typescript) {
          result = result
            .replace("parser: '@typescript-eslint/parser',", '')
            .replace("plugins: ['@typescript-eslint'],", '');
        }
        if (framework === 'vue') {
          result = result.replace(
            "'prettier'",
            `'plugin:${framework}/recommended','prettier'`
          );
        } else if (framework === 'react') {
          result = result.replace(
            "'prettier'",
            `'plugin:${framework}/recommended','plugin:react/jsx-runtime','prettier'`
          );
        }
      }
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
          log('failed!write.', err);
        }
      });
    })
    .catch((err) => {
      log('failed!read.', err);
    });
}

/**
 * 生成代码规范配置文件
 */
function generateConfig(typePath) {
  const pathList = getConfigList(typePath)
    .flat()
    .map((path) => path.replace(`${typePath}/`, ''));
  pathList.forEach((path) => {
    util
      .promisify(fs.access)(`./${path}`, fs.constants.F_OK)
      .then(() => {
        //文件存在
        fs.promises.rename(`./${path}`, `./${path}.bak`).then(() => {
          write(path, `./${path}`, typePath);
        });
      })
      .catch((err) => {
        //文件不存在
        if (
          path.indexOf('/') > -1 &&
          !fs.existsSync(`./${path.split('/')[0]}`)
        ) {
          fs.mkdirSync(`./${path.split('/')[0]}`);
        }
        write(path, `./${path}`, typePath);
      });
  });
}

function getDependencies() {
  let config = JSON.parse(fs.readFileSync(packageJsonPath).toString());
  return Object.keys(
    Object.assign({}, config.dependencies, config.devDependencies)
  );
}

function checkDependencies() {
  let result = [];
  let depList = getDependencies();
  if (typescript) {
    lintDep = [...lintDep, ...typescriptDep];
  }
  lintDep.push(`${frameworkDep}${framework}`);
  lintDep.forEach((dep) => {
    if (!depList.find((item) => item === dep)) {
      result.push(dep);
    }
  });
  log(
    result.length
      ? '\n' +
          chalk.red('Error!') +
          `\nThis dependency was not found:\n` +
          `* ${result.join(' ')}\n` +
          `To install it, you can run: npm install ${result.join(' ')} -D`
      : ''
  );
}

async function initialize(options) {
  typescript = options.typescript;
  framework = options.framework;
  bar.start(100, 0);
  if (options.commit) {
    generateConfig(commitBaseConfigPath);
    bar.update(30);
  }
  checkDependencies();
  bar.update(60);
  generateConfig(codeBaseConfigPath);
  bar.update(100);
  bar.stop();
}

const init = {
  initialize,
};

module.exports = init;
