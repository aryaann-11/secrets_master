import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const mongodb_uri =
    "mongodb+srv://feature_tracking_dev:nPNGJ9ZAnyxNsMEN@cluster0.ivmnrbn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("secrets-master");
  switch (req.method) {
    case "POST":
      const secret = JSON.parse(req.body);
      const mySecret = await db.collection("secrets").insertOne(secret);
      res.status(200).json({ message: "Item inserted" });
      break;
    case "GET":
      const all_secrets = await db.collection("secrets").find({}).toArray();
      res.status(200).json(all_secrets);
      break;
  }
}
