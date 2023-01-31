/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 08:58:19
 * @modify date 2018-06-03 08:58:19
 * @desc A class that using for handle message that got from Line Chat.
 */
const lineApiService = require("../services/line-api-service");

class LineMessaging {
  constructor() {}

  replyMessage(replyToken, message) {
    return new Promise(function (resolve, reject) {
      try {
        let _messages = [
          {
            type: "text",
            text: message,
          },
        ];
        return lineApiService.reply(replyToken, _messages).then(function (rs) {
          return resolve(rs);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new LineMessaging();
