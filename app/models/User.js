import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    // required: true,
  },
  birthDate: {
    type: Date,
    // required: false,
    default: Date.now(),
  },
  gender: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  introducePersonal: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  coverImg: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1360794070/vector/concept-of-future-digital-technology-metaverse-colorful-background-vector-illustration-eps10.jpg?s=612x612&w=0&k=20&c=muAKVP1-6rwJs5JWn4qb-OlXeait5_2ZZ8IO-vq9NsU=",
    required: false,
  },
  friends: [],
  groups: [],
  tokens: [
    {
      token: {
        type: String,
        required: false,
        // required: true,
      },
    },
  ],
  refreshToken: {
    type: String,
    required: false,
  },

  idRequest: {
    type: String,
  },
});

User.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});

const UserModel = mongoose.model("User", User);
export default UserModel;
