const express = require("express");
const app = express();
const port = 3000;

let balance = 5000;

app.get("/balance", (req, res) => {
  res.json({ balance: balance });
});

app.get("/withdraw", (req, res) => {
  balance -= 1000;
  res.json({ withdraw: 1000, balance: balance });
});

app.get("/deposit", (req, res) => {
  balance += 100;
  res.json({ deposit: 100, balance: balance });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
