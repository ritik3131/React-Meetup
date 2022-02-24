import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import meetupModel, { createIndexes } from "../../models/meetupModel";
import dbConnect from "../../utils/dbConnect";

dbConnect();
// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const { title, image, description, address } = req.body;
    const createdBy= ObjectId(session.user.id)

    const newMeetup = new meetupModel({
      title,
      createdBy,
      image,
      description,
      address,
    });

    await newMeetup.save();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
