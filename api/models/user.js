import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    username: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.getUserByEmail = function (email, cb) {
  return Users.findOne({ email: email }).selectFieldsSingle().exec();
};

userSchema.statics.getUserById = function (id, cb) {
  return Users.findById(id).selectFieldsSingle().exec();
};

userSchema.statics.getUserByUsername = function (username, cb) {
  return Users.findOne({ username: username }).selectFieldsSingle().exec();
};

userSchema.statics.signUp = function (email, hashedPassword, username, cb) {
  const newUser = new Users({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: hashedPassword,
    username: username,
  });
  return newUser.save();
};

userSchema.statics.generateHashedPassword = function (plaintextPassword, cb) {
  return bcrypt.hash(plaintextPassword, 10);
};

userSchema.methods.comparePassword = function (plaintextPassword, cb) {
  return bcrypt.compare(plaintextPassword, this.password);
};

userSchema.methods.generateJWT = function (cb) {
  return jwt.sign(
    {
      username: this.username,
      id: this._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
};

userSchema.methods.softDelete = async function (cb) {
  await this.set({ deleted: true }).save();
  return this;
};

userSchema.methods.undoDeletion = async function (cb) {
  await this.set({ deleted: false }).save();
};

userSchema.query.selectFieldsGrouped = function (cb) {
  return this.select("_id username password deleted");
};

userSchema.query.selectFieldsSingle = function (cb) {
  return this.select("_id username password deleted createdAt updatedAt");
};

const Users = mongoose.model("Users", userSchema);

export default Users;
