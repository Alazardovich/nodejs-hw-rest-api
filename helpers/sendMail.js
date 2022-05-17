/* eslint-disable no-useless-catch */
const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_MAIL_PASSWORD, UKR_USER } = process.env;

const sendMail = async (data) => {
  const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: UKR_USER,
      pass: UKR_MAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(nodemailerConfig);

  const email = {
    ...data,
    from: UKR_USER,
  };
  try {
    await transporter.sendMail(email);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    throw error;
  }

};
module.exports = sendMail;
