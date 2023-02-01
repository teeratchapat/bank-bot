import axios from "axios";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri =
  "mongodb+srv://teeratchapat:Tee1234@cluster0.8sthelg.mongodb.net/test";

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db("bank_bot"); // database name
});

const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

const reply = async (replyToken, messages) => {
  try {
    const body = JSON.stringify({ replyToken, "messages" });
    
    const { status } = await axios.post(apiRoute, body, { headers });
    console.log("status = " + status);
    return status;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default reply;
