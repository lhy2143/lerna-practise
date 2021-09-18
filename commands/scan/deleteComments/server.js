const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const serve = require("koa-static-server");
const router = new Router();
const koaBody = require("koa-body");
const path = require("path");
let childProcess = require("child_process");
let port =
  process.argv[2] === "undefined" || isNaN(parseInt(process.argv[2]))
    ? 8090
    : parseInt(process.argv[2]);
let result = "";

function openBrowser() {
  childProcess.exec(`start http://localhost:${port}/public/index.html`);
}

router.get("/result", (ctx, next) => {
  ctx.body = JSON.stringify(result, null, 4);
  ctx.status = 200;
});

router.post("/upload", (ctx, next) => {
  result = ctx.request.body;
  openBrowser();
  ctx.body = "success";
  ctx.status = 200;
});

app.use(
  koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, "./crash"),
      // 保留文件扩展名
      // keepExtensions: true,
    },
  })
);

app.use(
  serve({ rootDir: path.join(__dirname, "/public"), rootPath: "/public" })
);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, (e) => {
  console.log(`app is listening at ${port}`, e);
  global.port = port;
  require("../scan");
});

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
