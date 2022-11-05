const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const petsRouter = require("./routes/api/pets");
const authRouter = require("./routes/api/auth");
const newsRouter = require("./routes/api/news");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/avatars", express.static("public/avatars"));
app.use("/api/pets", petsRouter);
app.use("/users", authRouter);
app.use("/news", newsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = "Server error.",
    code = err.status,
    result = err.result,
  } = err;
  res.status(status).json({ code, status: result, message });
});

module.exports = app;
