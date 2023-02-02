/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
require("dotenv").config();

const server = require("express");
const PORT = process.env.PORT || 5001;
const request = require("request");
const bodyParser = require("body-parser");
const lineMessaging = require("./src/classes/line-messaging");

let currentStep = "start";

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  // console.log(JSON.stringify(req.body));
  .post("/webhook", function (req, res) {
    const message = req.body.events[0]?.message.text;
    const replyToken = req.body.events[0]?.replyToken;

    switch (currentStep) {
      case "start":
        if (message === "register") {
          currentStep = "enterUsername";
          sendReply(replyToken, "Please enter username");
        } else {
          sendReply(replyToken, "I do not understand what you mean");
        }
        break;
      case "enterUsername":
        currentStep = "enterPassword";
        sendReply(replyToken, "Please enter password");
        break;
      case "enterPassword":
        currentStep = "start";
        const user = new User({ username: message, password: message });
        user.save((error) => {
          if (error) {
            sendReply(replyToken, error);
          } else {
            sendReply(replyToken, "User created successfully");
          }
        });
        break;
      default:
        sendReply(replyToken, "Invalid state");
    }

    res.status(200).send("OK");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function sendReply(replyToken, message) {
  axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LINE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}
