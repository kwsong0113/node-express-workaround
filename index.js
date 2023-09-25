let express = require("express");
let app = express();

let i = 0;
const LOOP_NUM = 9999999999999999999999999;

function respond(res, delay) {
  setTimeout(function () {
    res.send("Hello " + i++);
  }, delay);
}

function compute(i) {
  // do some computation with i
}

function loopChunk(start) {
  if (start > LOOP_NUM) {
    respond(res, 0);
    return;
  } else {
    end = Math.min(start + 10, LOOP_NUM);
    for (let i = start; i < end; i++) {
      compute(i);
    }
  }
  setImmediate(() => loopChunk(end + 1));
}

app.get("/fast", function (req, res) {
  respond(res, 0);
});

app.get("/slow1", function (req, res) {
  loopChunk(0);
});

app.get("/slow2", function (reg, res) {
  respond(res, 2147483647); // max signed int value
});

app.listen(3000);

console.log("Listening on port 3000...");
