const Mailjet = require("node-mailjet");

const sendEmail = async (options) => {
  const {email,subject,message} = options
    const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC,
        apiSecret: process.env.MJ_APIKEY_PRIVATE
      });
  const request =mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.MJ_SENDER_EMAIL,
          Name: process.env.APP_NAME,
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: subject,
        HTMLPart:message,
        CustomID:"AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
    return request
};
module.exports = sendEmail;
