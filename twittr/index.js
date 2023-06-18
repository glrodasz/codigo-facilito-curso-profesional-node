const express = require("express");
const config = require("./config");
const tweetsRouter = require("./routes/tweetsRouter");
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require("./utils/middlewares/errorMiddlewares");

const app = express();
const port = config.port;

app.use(express.json());
app.use("/tweets", tweetsRouter);

// Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`🌍 Server running at http://localhost:${port}`)
);
