const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === undefined) {
  dotenv.config({
    path: path.resolve(__dirname, `dev.env`),
  });
} else {
  dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
  });
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  GMAIL_USER: process.env.GMAILUSER,
  GMAIL_PASS: process.env.GMAILPASSWORD,
  CLIENT_URL: process.env.CLIENT_URL,
};
