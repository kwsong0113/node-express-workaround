const { Worker, isMainThread, parentPort } = require("worker_threads");
let express = require("express");
let app = express();

if (isMainThread) {
  let i = 0;

  function respond(res, delay) {
    setTimeout(function () {
      res.send("Hello " + i++);
    }, delay);
  }

  app.get("/fast", function (req, res) {
    respond(res, 0);
  });

  app.get("/slow1", function (req, res) {
    const worker = new Worker(__filename);
    worker.on("message", () => respond(res, 0));
  });

  app.get("/slow2", function (reg, res) {
    respond(res, 2147483647); // max signed int value
  });

  app.listen(3000);
} else {
  const LOOP_NUM = 9999999999999999999999999;
  function compute(i) {
    // do some computation with i
  }

  for (let i = 0; i < LOOP_NUM; i++) {
    compute(i);
  }
  parentPort.postMessage("computation completed");
}
