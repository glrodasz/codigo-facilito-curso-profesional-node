const dotenv = require("dotenv");
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3000,
  databaseUrl: `${process.env.DATABASE_URL}?ssl={"rejectUnauthorized":true}`,
  corsOrigin: process.env.CORS_ORIGIN || "https://client.twittr.com",
};

module.exports = config;
