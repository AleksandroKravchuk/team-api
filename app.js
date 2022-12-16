const express = require("express");
// const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const petsRouter = require("./routes/api/pets");
const authRouter = require("./routes/api/auth");
const newsRouter = require("./routes/api/news");
const friendsRouter = require("./routes/api/friends");
const noticesRouter = require("./routes/api/notices");
const userRouter = require("./routes/api/user");
const googleRouter = require("./routes/api/google");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json);
app.use(logger(formatsLogger));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use("/friends", express.static("public/IMG"));
app.use("/photoNotice", express.static("public/photoNotice"));
app.use("/photoPet", express.static("public/photoPet"));
app.use("/avatars", express.static("public/avatars"));
app.use("/", authRouter);
app.use("/auth", googleRouter);
app.use("/pets", petsRouter);
app.use("/user", userRouter);
app.use("/notices", noticesRouter);
app.use("/news", newsRouter);
app.use("/friends", friendsRouter);
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
