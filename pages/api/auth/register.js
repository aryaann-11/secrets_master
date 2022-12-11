import { MongoClient } from "mongodb";
import CryptoJS from "crypto-js";
import clientPromise from "../../../lib/mongodb";

function getPasswordFields(password) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  });
  const passwordFields = {
    salt: salt,
    hash: hash,
  };
  console.log(passwordFields);
  return passwordFields;
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("secrets-master");
  switch (req.method) {
    case "POST":
      const credentials = JSON.parse(req.body);
      const password = credentials.password;
      const fields = getPasswordFields(password);
      const user = {
        username: credentials.username,
        password_fields: fields,
      };
      try {
        const u = await db.collection("users").insertOne(user);
        res.status(200).json({ message: "You have been registered" });
      } catch (error) {
        res.status(400).json({ message: "Registeration failed" });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
