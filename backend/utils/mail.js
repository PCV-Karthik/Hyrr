const nodemailer = require("nodemailer");

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

const transport = () => nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const plainEmailTemplate = (title, message) => {
  return `
    <html>
      <head>
        <style>
          .container {
            padding: 20px;
            text-align: center;
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${title}</h1>
          <p>${message}</p>
        </div>
      </body>
    </html>
  `;
};

module.exports = {generateOTP,transport,plainEmailTemplate}