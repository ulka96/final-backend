import mongoose from "mongoose";

const UserSchema = mongoose.Schema ({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
    required: false,
    default: null,

  }

})

const User = mongoose.model("User", UserSchema)

export default User