const express = require("express");
const helmet = require("helmet");
const debug = require("debug")("app:server");
const cors = require("cors");
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

// Global middlewares
app.use(cors({ origin: config.dev ? "*" : config.corsOrigin }));
app.use(helmet());
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
debug(`🌍 Server running at http://localhost:${port}`)
);
