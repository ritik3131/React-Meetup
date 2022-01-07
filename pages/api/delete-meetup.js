import { MongoClient,ObjectId } from "mongodb";

// /api/delete-meetup
// DELETE /api/delete-meetup

async function handler(req, res) {
  if (req.method === "DELETE") {
    const meetupId= req.body.split('"')[1];

    const MongoDb_URL= process.env.DB_URL.split('"')[1];
    const client = await MongoClient.connect(MongoDb_URL);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    await meetupsCollection.findOneAndDelete({
        _id: ObjectId(meetupId),
      });

    client.close();

    res.status(201).json({ message: "Meetup Delete!" });
  }
}

export default handler;
