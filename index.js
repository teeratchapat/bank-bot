/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
const mongoose = require("mongoose");
const axios = require("axios");
const server = require("express");
const PORT = process.env.PORT || 5001;
const bodyParser = require("body-parser");

require("dotenv").config();

mongoose.connect(
  "mongodb+srv://teeratchapat:Tee1234@cluster0.8sthelg.mongodb.net/bank_bot",
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  total: { type: Number, required: true },
});

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
const Transaction = mongoose.model("transactions", transactionSchema);

let userTest = {};

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

function sendQuickReply(replyToken, message) {
  axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken,
      messages: [
        {
          type: "text",
          text: message,
          quickReply: {
            items: [
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "100",
                  text: 100,
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "500",
                  text: 500,
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "1000",
                  text: 1000,
                },
              },
            ],
          },
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

function sendQuickReply(replyToken, message) {
  axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken,
      messages: [
        {
          type: "text",
          text: message,
          quickReply: {
            items: [
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "100",
                  text: 100,
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "500",
                  text: 500,
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "1000",
                  text: 1000,
                },
              },
            ],
          },
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

function sendMessage(replyToken, message) {
  axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken,
      messages: [
        {
          type: "text",
          text: message,
          quickReply: {
            items: [
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "ฝากเงิน",
                  text: "ฝากเงิน",
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "ถอนเงิน",
                  text: "ถอนเงิน",
                },
              },
              {
                type: "action",
                imageUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png",
                action: {
                  type: "message",
                  label: "ดูยอดเงิน",
                  text: "ดูยอดเงิน",
                },
              },
            ],
          },
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

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  .post("/webhook", async function (req, res) {
    res.json({
      status: 200,
      message: `Sent message!`,
    });

    let replyToken = req.body.events[0]?.replyToken;
    let message = req.body.events[0]?.message.text;
    const userId = req.body.events[0]?.source.userId;

    console.log(`Message token : ${replyToken}`);
    console.log(`Message from chat : ${message}`);
    // console.log(`userId: ${userId}`);

    if (!userTest[userId]) {
      userTest[userId] = { currentStep: "start" };
    }

    switch (userTest[userId].currentStep) {
      case "start":
        if (message === "ฝากเงิน") {
          userTest[userId].currentStep = "deposit";
          sendReply(replyToken, "จำนวนเท่าไหร่");
        } else if (message === "ถอนเงิน") {
          userTest[userId].currentStep = "withdraw";
          sendQuickReply(replyToken, "จำนวนเท่าไหร่");
        } else if (message === "ดูยอดเงิน") {
          // userTest[userId].currentStep = "balance";
          userTest[userId].currentStep = "start";
          let query = await Transaction.find({
            user_id: userId,
          }).exec();
          let sum = 0;
          await query.map((item) => {
            sum = item.amount + sum;
          });
          sendReply(replyToken, sum);
        } else if (message === "เมนู") {
          sendMessage(replyToken, "คุณต้องการทำรายการอะไร");
        } else {
          sendReply(replyToken, "ฉันไม่เข้าใจที่คุณจะสื่อ");
        }
        break;
      case "deposit":
        userTest[userId].currentStep = "start";
        const transactionDeposit = new Transaction({
          date: new Date(),
          user_id: userId,
          amount: message,
          type: "deposit",
        });

        transactionDeposit.save((error) => {
          if (error) {
            sendReply(replyToken, error.message);
          } else {
            sendReply(replyToken, "ฝากเงินสำเร็จ");
          }
        });
        break;
      case "withdraw":
        userTest[userId].currentStep = "start";
        const trasactionWithdraw = new Transaction({
          date: new Date(),
          user_id: userId,
          amount: message * -1,
          type: "withdraw",
        });
        trasactionWithdraw.save((error) => {
          if (error) {
            sendQuickReply(replyToken, error.message);
          } else {
            sendReply(replyToken, "ถอนเงินสำเร็จ");
          }
        });
        break;

      default:
        sendReply(replyToken, "ทำรายการไม่สำเร็จ");
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
