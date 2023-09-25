let express = require("express");
let app = express();

let i = 0;

function respond(res, delay) {
  setTimeout(function () {
    res.send("Hello " + i++);
  }, delay);
}

function compute(i) {
  // do some computation with i
}

app.get("/fast", function (req, res) {
  respond(res, 0);
});

app.get("/slow1", function (req, res) {
  for (let i = 0; i < 9999999999999999999999999; i++) {
    compute(i);
  }
  respond(res, 0);
});

app.get("/slow2", function (reg, res) {
  respond(res, 2147483647); // max signed int value
});

app.listen(3000);

console.log("Listening on port 3000...");
