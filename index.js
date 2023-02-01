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

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  // console.log(JSON.stringify(req.body));
  .post("/webhook", function (req, res) {
    let replyToken = req.body.events[0]?.replyToken;
    let message = req.body.events[0]?.message.text;

    console.log(`Message token : ${replyToken}`);
    console.log(`Message from chat : ${message}`);

    lineMessaging.replyMessage(replyToken, message).then(function (rs) {
      console.log(`Reply message result : ${rs}`);

      res.json({
        status: 200,
        message: `Sent message!`,
      });
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
