import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("secrets-master");
  const username = req.query.username;
  switch (req.method) {
    case "POST":
      const secret = JSON.parse(req.body);
      const mySecret = await db.collection("secrets").insertOne(secret);
      res.status(200).json({ message: "Item inserted" });
      break;
    case "GET":
      const all_secrets = await db
        .collection("secrets")
        .find({ belongs_to: username })
        .toArray();
      res.status(200).json(all_secrets);
      break;
  }
}
