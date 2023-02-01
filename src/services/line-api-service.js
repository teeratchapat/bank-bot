const request = require("request");
const apiToken =
  "7oX36hL63bNEK+CVltL+yk+t2gdu/7eGSZOPGwzBFiHz4zd6PUzaZbaV5I0WLSWTyJN8K5BKHY8wy6Net9LU1277lM+ajMSV9v7vWYD3ZPrG0uDENUNtMkMw9Qge+WXhMcB7qLiml3dY+yfIMhZfIAdB04t89/1O/w1cDnyilFU=";
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiToken}`,
};

const reply = (replyToken, messages) => {
  const body = JSON.stringify({ replyToken, messages });
  return new Promise((resolve, reject) => {
    request.post({ url: apiRoute, headers, body }, (err, res) => {
      if (err) return reject(err);
      console.log("status = " + res.statusCode);
      resolve(res.statusCode);
    });
  });
};

module.exports = reply;
