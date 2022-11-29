import UserModel from "../models/User.js";
import mongoose from "mongoose";
const UserController = {
  update: (req, res, next) => {
    const user = req.user;
    let { name, gender, birthDate, avatar } = req.body;
    name = name ? name : user.name;
    gender = gender ? gender : user.gender;
    birthDate = birthDate ? birthDate : user.birthDate;
    avatar = avatar ? avatar : user.avatar;

    UserModel.updateOne(
      { _id: user._id },
      {
        name,
        birthDate,
        gender,
        avatar,
      }
    )
      .then(() => {
        res.status(200).send({
          message: "Cập nhật thành công",
          user: {
            ...user._doc,
            name,
            birthDate,
            gender,
            avatar,
          },
        });
      })
      .catch((error) => {
        res.status(400).send({ message: "Cập nhật thất bại!!!", error });
      });
  },
  getListUserFromId: async (req, res) => {
    console.log("Get List User From Id: ");
    // Mảng chứa thông tin user từ id
    const listUser = [];
    const listUserId = req.listIdUser;
    console.log("listUserId: " + listUserId);
    try {
      for (const user of listUserId) {
        const id = user.id;
        const idRequest = user.idRequest;
        console.log("idRequest: " + idRequest);
        const data = await UserModel.findOne({ _id: id });
        data.idRequest = idRequest;
        listUser.push(data);
      }
      // Trả về list user
      console.log("----------End: getListUserFromId ------------------");
      res.status(200).json({ listUser });
    } catch (error) {
      res.status(402).send(error);
    }
  },
  findUserExistInGroup: async (req, res) => {
    const { username, idGroup } = req.params;

    try {
      const user = await UserModel.findOne({ username });
      const listGroup = user.groups;
      let isExist = false;
      listGroup.forEach((group) => {
        if (group.id) {
          if (group.id.toString() === idGroup) isExist = true;
        }
      });
      if (!user) {
        res.status(404).send({ message: "Không tìm thấy" });
      }
      res.status(200).json({ user, isExist });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  getProfileUserFromId: async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const data = await UserModel.findById({
      _id: mongoose.Types.ObjectId(id),
    }).select([
      "_id",
      "username",
      "name",
      "birthDate",
      "gender",
      "address",
      "introducePersonal",
      "avatar",
      "coverImg",
      "friends",
      "groups",
    ]);

    if (!data) {
      res.status(500).json("null");
    } else {
      res.status(200).json(data);
    }
  },
};
export default UserController;
