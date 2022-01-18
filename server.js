const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT || "3000");
const path = require("path");

app.use(express.json());

const { allQuotas } = require("./quota");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/quota", async (req, res) => {
  res.send(
    req.body.pass === process.env.ADMIN_PASS
      ? await allQuotas()
      : "Not Authorized"
  );
});

app.listen(PORT, () => {
  console.log(`Gp Heroku listening at ${PORT}`);
});
