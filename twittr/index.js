const express = require("express");
const config = require("./config");
const tweetsRouter = require("./routes/tweetsRouter");
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require("./utils/middlewares/errorMiddlewares");
const notFound = require("./utils/middlewares/notFoundMiddleware");

const app = express();
const port = config.port;

app.use(express.json());
// app.use("/tweets", tweetsRouter);
tweetsRouter(app);

// Catch 404
app.use(notFound);

// Error middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`🌍 Server running at http://localhost:${port}`)
);
