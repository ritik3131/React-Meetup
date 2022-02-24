const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: String,
    default:null,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.models.user || mongoose.model("user", UserSchema);
