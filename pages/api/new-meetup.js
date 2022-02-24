import meetupModel from "../../models/meetupModel";
import dbConnect from "../../utils/dbConnect";

dbConnect();
// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const newMeetup=new meetupModel(data)
    
    await newMeetup.save();
    // console.log(newMeetup)
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
