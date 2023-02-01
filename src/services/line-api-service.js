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

class LineAPIService {
  db;

  reply = async (replyToken, messages) => {
    try {
      MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log(err);
        this.db = client.db("bank_bot"); // database name
        console.log("db connect success");
      });

      console.log(messages[0]["text"]);
      messages[0]["text"] = "tee";

      this.db?.collection("items").save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log("saved to database");
      });

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
