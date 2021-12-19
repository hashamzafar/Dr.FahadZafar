
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Such email already exists"],
  },
  password: { type: String, required: true },

  refreshToken: { type: String },
  accessToken: { type: String }
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const plainPassword = user.password;
  console.log("coming from schema", plainPassword);
  if (user.isModified("password")) {
    // user.password = await bcrypt.hash(plainPassword, 10);
    console.log(user.password);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  delete userObject.refreshToken;

  return userObject;
};

UserSchema.statics.checkCredentials = async function (email, plainPassword) {
  const user = await this.findOne({ email });

  if (user) {
    console.log("user find:", user);

    const isMatch = await bcrypt.compare(plainPassword, user.password);

    if (isMatch) return user;
    else return null;
  } else return null;
};


export default model("user", UserSchema);
