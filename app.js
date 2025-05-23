require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}.`));
