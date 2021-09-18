let { parse } = require("@babel/parser");
let { default: generate } = require("@babel/generator");
let fs = require("fs");
const compiler = require("vue-template-compiler");
const parser = require("./parser");

// 去掉vue文件中的所有注释
async function deleteCommentsText(file) {
  let text = await fs.promises.readFile(file, "utf8");
  return parser(
    text,
    {},
    {
      parse: false, // do not parse;
      html: false, // treat as plain text;
    }
  );
}

// remove comments in js|ts
async function deleteComments(file) {
  let codes = await fs.promises.readFile(file, "utf8");
  let ast = parse(codes, { sourceType: "unambiguous" });
  let { code } = generate(ast, { comments: false }, codes);
  return code;
}

async function transfromVueToJs(file) {
  let codes = await fs.promises.readFile(file, "utf8");
  const parsed = compiler.parseComponent(codes);
  return parsed.script && parsed.script.content;
}

async function transfromVueToAst(file) {
  let content = await transfromVueToJs(file);
  let ast = parse(content, {
    sourceType: "unambiguous",
    plugins: ["transform-vue-jsx"],
  });
  // fs.writeFile(
  //   file.replace("vue", "json"),
  //   JSON.stringify(ast, null, 4),
  //   (err) => {
  //     if (err) throw err;
  //     console.log(`The file ${file} has been created!`);
  //   }
  // );

  let { code } = generate(ast, { comments: false }, content);
  return code;
}
module.exports = {
  deleteComments,
  deleteCommentsText,
  transfromVueToJs,
  transfromVueToAst,
};
