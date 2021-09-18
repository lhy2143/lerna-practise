const { fstat } = require("fs");
const http = require("http");

function sendData(data) {
  const options = {
    hostname: "localhost",
    port: global.port,
    path: "/upload",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
    body: {
      file: "vubhjnk",
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // 将数据写入请求正文
  req.write(data);
  req.end();
}

module.exports = { sendData };
