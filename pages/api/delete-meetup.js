import { MongoClient,ObjectId } from "mongodb";
import meetupModel from "../../models/meetupModel";
import dbConnect from "../../utils/dbConnect";

dbConnect();

// /api/delete-meetup
// DELETE /api/delete-meetup

async function handler(req, res) {
  if (req.method === "DELETE") {
    const meetupId= req.body.split('"')[1];

    await meetupModel.findByIdAndDelete(meetupId);

    res.status(201).json({ message: "Meetup Delete!" });
  }
}

export default handler;
