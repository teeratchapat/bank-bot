const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const { stringify } = JSON;

require("dotenv").config();

const apiToken = process.env.LINE_API_TOKEN;
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

const uri =
  "mongodb+srv://teeratchapat:Tee1234@cluster0.8sthelg.mongodb.net/test";

class LineAPIService {
  db;

  async reply(replyToken, messages) {
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      this.db = client.db("bank_bot");
      console.log("DB connect success");

      messages[0].text = "tee";
      await this.db.collection("users").insertOne(messages[0]);
      console.log("Saved to database");

      // let messageReturn = await this.db.collection("users").find({});
      // console.log(messageReturn);
      const body = stringify({ replyToken, messages });
      const response = await request.post({ url: apiRoute, headers, body });
      console.log(`status = ${response.statusCode}`);
      return response.statusCode;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LineAPIService();
