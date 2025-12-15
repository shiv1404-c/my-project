
const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const testToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  } else {
    throw new ExpressError(401, "ACCESS DENIED!");
  }
};

app.get("/api", testToken, (req, res) => {
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root.");
});

app.get("/random", (req, res) => {
  res.send("this is random page");
});

app.get("/admin", (req , res)=>{
    throw new ExpressError(403, "Acces to admin is Forbidden");
})

app.use((err, req, res, next) => {
  let { status=500, message } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
