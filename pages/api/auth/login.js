import { MongoClient } from "mongodb";
import CryptoJS from "crypto-js";
import clientPromise from "../../../lib/mongodb";

function generateHash(password, salt) {
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  });
  return hash;
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("secrets-master");
  switch (req.method) {
    case "POST":
      const credentials = req.body;
      const password = credentials.password;
      const username = credentials.username;
      try {
        const user = await db
          .collection("users")
          .findOne({ username: username });
        const salt = user.password_fields.salt;
        const checkSum = user.password_fields.hash;
        const hash = generateHash(password, salt);
        if (JSON.stringify(checkSum) != JSON.stringify(hash)) {
          console.log("Invalid password");
          res.status(400).json({ message: "Invalid password" });
        } else {
          const myUser = {
            username: username,
            password: password,
          };
          res.status(200).json(myUser);
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
