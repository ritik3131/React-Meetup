const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetupsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Provide title"],
  },
  description: {
    type: String,
    required: [true, "Please Provide description"],
  },
  //   bookedBy: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
  address: {
    type: String,
    required: [true, "Please Provide address"],
  },
  image: {
    type: String,
    required: [true, "Please Provide image url"],
  },
});

module.exports =
  mongoose.models.meetup || mongoose.model("meetup", MeetupsSchema);
