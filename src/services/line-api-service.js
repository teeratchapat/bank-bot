const request = require("request");
const { stringify } = JSON;
const apiToken = process.env.LINE_API_TOKEN;
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

require("dotenv").config();
class LineAPIService {
  reply = async (replyToken, messages) => {
    try {
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
