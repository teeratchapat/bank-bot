const request = require("request");
const apiToken =
  "7oX36hL63bNEK+CVltL+yk+t2gdu/7eGSZOPGwzBFiHz4zd6PUzaZbaV5I0WLSWTyJN8K5BKHY8wy6Net9LU1277lM+ajMSV9v7vWYD3ZPrG0uDENUNtMkMw9Qge+WXhMcB7qLiml3dY+yfIMhZfIAdB04t89/1O/w1cDnyilFU=";
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken,
};

class LineAPIService {
  constructor() {}

  async reply(replyToken, messages) {
    try {
      let body = JSON.stringify({
        replyToken: replyToken,
        messages: messages,
      });
      const res = await request.post({
        url: apiRoute,
        headers: headers,
        body: body,
      });
      console.log("status = " + res.statusCode);
      return res.statusCode;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new LineAPIService();
