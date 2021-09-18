const { default: scandir, defaultFilesystem } = require("./lib/cjs/index.js");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

let wb = XLSX.utils.book_new();
const filePath = process.cwd() + "/count.xlsx";
const suffix = [".js", ".ts", ".jsx", ".tsx"];
const { data } = require("./data");
const { sendData } = require("./deleteComments/http");
const {
  deleteComments,
  deleteCommentsText,
  transfromVueToJs,
  transfromVueToAst,
} = require("./deleteComments");
let rt = [];
let date = new Date();
let format =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getDate() +
  "$" +
  date.getHours() +
  "-" +
  date.getMinutes() +
  "-" +
  date.getSeconds();

scandir(process.cwd()).then(async function (result) {
  for (let i = 0; i < result.files.length; i++) {
    let filename = result.files[i];

    let extname = path.extname(filename);
    if (filename.indexOf("node_modules") === -1) {
      let arr = [];
      if (suffix.includes(extname)) {
        let content = await deleteComments(filename);
        arr = content.match(/ucf\.(api\.)*\w*\.\w*/g);
        if (arr) {
          rt = rt.concat(arr);
        }
      } else if (extname === ".vue") {
        // let content = await deleteCommentsText(filename)
        // arr = content.match(/ucf\.(api\.)*\w*\.\w*/g)
        // console.log(11, arr)
        // if (arr) {
        //     rt = rt.concat(arr)
        // }
        let content = await transfromVueToAst(filename);
        arr = content.match(/ucf\.(api\.)*\w*\.\w*/g);
        if (arr) {
          rt = rt.concat(arr);
        }
      }
    }
  }
  getCount(rt);
});

function getCount(arr) {
  let map = new Map();
  arr.forEach((item) => {
    if (data.includes(item)) {
      let num = map.get(item);
      if (num) {
        map.set(item, num + 1);
      } else {
        map.set(item, 1);
      }
    }
  });

  let result = Array.from(map).sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });
  result.unshift(["模块名称", "使用次数"]);
  generateXlsx(result, format);
  return map;
}

function generateXlsx(arr, sheetName) {
  sendData(JSON.stringify(arr));
  fs.access(filePath, fs.constants.F_OK, (err) => {
    console.log(`${err ? "count.xlsx不存在" : "count.xlsx存在"}`);
    if (err) {
      let ws = XLSX.utils.aoa_to_sheet(arr);
      /* Add the worksheet to the workbook */
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, "count.xlsx");
      console.log(`生成的文件名为: count.xlsx`);
    } else {
      fs.promises
        .rename(filePath, `${filePath}.${format}.bak`)
        .then(() => {
          let ws = XLSX.utils.aoa_to_sheet(arr);
          /* Add the worksheet to the workbook */
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
          XLSX.writeFile(wb, "count.xlsx");
          console.log(`生成的文件名为: count.xlsx`);
        })
        .catch((e) => {
          let ws = XLSX.utils.aoa_to_sheet(arr);
          /* Add the worksheet to the workbook */
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
          XLSX.writeFile(wb, `count.${format}.xlsx`);
          console.log(`生成的文件名为:count.${format}.xlsx`);
        });
    }
  });
}
