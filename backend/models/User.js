import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  //this.password is the password currently saved in the database for that user
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if we are just saving some user data but not dealing with the password, then it will just move on
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password is for the current user who is trying to sign up
}); //pre allows us to do something before its saved in the database

export default mongoose.model("User", UserSchema);
