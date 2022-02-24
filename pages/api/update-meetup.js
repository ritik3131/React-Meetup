import { MongoClient, ObjectId } from "mongodb";
import meetupModel from "../../models/meetupModel";
import dbConnect from "../../utils/dbConnect";

dbConnect();

// /api/delete-meetup
// DELETE /api/delete-meetup

async function handler(req, res) {
  if (req.method === "PUT") {
    const data = req.body;

    await meetupModel.findByIdAndUpdate(data.id, {
      $set: {
        title: data.title,
        image: data.image,
        description: data.description,
        address: data.address,
      },
    });

    res.status(201).json({ message: "Meetup Updated!" });
  }
}

export default handler;
