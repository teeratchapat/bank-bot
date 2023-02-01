const request = require("request");
const MongoClient = require("mongodb").MongoClient;

const { stringify } = JSON;
const apiToken = process.env.LINE_API_TOKEN;
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

require("dotenv").config();

const uri =
  "mongodb+srv://teeratchapat:Tee1234@cluster0.8sthelg.mongodb.net/test";

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db("bank_bot"); // database name
  console.log("db connect success");
});
class LineAPIService {
  reply = async (replyToken, messages) => {
    try {
      console.log(messages);

      const body = stringify({ replyToken, messages });
      const { statusCode } = await request.post({
        url: apiRoute,
        headers,
        body,
      });
      console.log(`status = ${statusCode}`);
      return statusCode;
    } catch (e) {
      throw e;
    }
  };
}

module.exports = new LineAPIService();
