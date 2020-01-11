const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false, typeInterval: 1 });
const express = require("express");

const app = express();

app.get("/", (req, res) =>
  nightmare
    .goto("https://www.blackrock.com/tools/pretrade")
    .wait("#signOnBean")
    .type("#userName", req.query.username)
    .type("#password", req.query.password)
    .click("#submitLogin")
    .wait(".application")
    .cookies.get()
    .end()
    .then(cookies => {
      const cookie = cookies.find(c => c.name === "JSESSION_blk-tools02");
      console.log(cookie);
      res.status(200).send(cookie);
    })
    .catch(error => {
      console.error("Search failed:", error);
      res.status(500).send(error);
    })
);

app.listen(process.env.PORT || 3001);
