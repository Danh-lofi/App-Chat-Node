import RequestFriendModel from "../models/requestFriend.js";
import UserModel from "../models/User.js";
const RequestFriendController = {
  getListRequest: async (req, res, next) => {
    console.log("Get List Requets: ");

    const id = req.params.id;
    const listRequest = await RequestFriendModel.find({ receiverId: id });
    // List request

    // Chuyển đổi list requets thành user
    // Mảng chứa list id người gửi
    const listReceiverId = [];
    listRequest.forEach((request) => {
      console.log("request: " + request._id);
      console.log(request);
      listReceiverId.push({
        id: request.senderId,
        idRequest: request._id.toString(),
      });
    });
    console.log("Array List Requets: ");

    console.log(listReceiverId);
    req.listIdUser = listReceiverId;

    next();
    // Gửi chuyển cho userController response cho client
  },
  acceptFriend: async (req, res) => {
    const idRequest = req.body.idRequest;
    console.log(idRequest);
    const listId = await RequestFriendModel.findOne({ _id: idRequest });
    console.log(listId);
    const senderId = listId.senderId;
    const receiverId = listId.receiverId;
    console.log("senderId: ");
    console.log(senderId);
    console.log("receiverId: ");
    console.log(receiverId);
    res.send(senderId + "+" + receiverId);
    try {
      const Result1 = await UserModel.findOneAndUpdate(
        { _id: senderId },
        { $push: { friends: { id: receiverId } } }
      );
      const Result2 = await UserModel.findOneAndUpdate(
        { _id: receiverId },
        { $push: { friends: { id: senderId } } }
      );
      await RequestFriendModel.deleteOne({ _id: idRequest });
    } catch (error) {
      console.log("loi");
    }
  },
  //tu choi ne
  declineFriend: async (req, res) => {
    console.log("---------------declineFriend------------------");
    const idRequest = req.body.idRequest;
    console.log("idRequest: ");
    console.log(idRequest);
    try {
      const data = await RequestFriendModel.deleteOne({ _id: idRequest });
      res.status(200).send(data);
    } catch (error) {
      res.status(402).send(error);
    }
  },
  sendRequestFriend: async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    console.log("Send Request Friend: ");
    console.log(senderId);
    console.log(receiverId);

    const request = new RequestFriendModel({ senderId, receiverId });
    try {
      const data = await request.save();

      console.log(data);
      res.status(200).send({ idRequest: data._id });
    } catch (err) {
      res.status(500).send(err);
    }
    console.log("End send");
  },
  checkRequestFriend: async (req, res) => {
    const friend = req.userFriend;
    const user = req.user;
    console.log(
      "-----------------------Check Request Friend --------------------"
    );

    const senderId = user._id.toString();
    const receiverId = friend._id.toString();
    console.log("user");
    console.log(senderId);
    console.log("friend");
    console.log(receiverId);
    try {
      const data = await RequestFriendModel.findOne({ senderId, receiverId });
      console.log(data);
      res.status(200).json({
        friend,
        isRequired: data ? true : false,
        idRequest: data ? data._id : null,
      });
    } catch (error) {
      res.status(402).send(error);
    }
  },
};

export default RequestFriendController;
