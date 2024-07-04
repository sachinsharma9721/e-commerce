const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_PASS } = require("../config");

module.exports = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
  host: "smtp.gmail.com",
});
