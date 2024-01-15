import UserModel from "../schemas/UserSchema";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const UpdateUser = async (req: any, res: any) => {
  try {
    let { name, mobileNumber, gender } = req?.body;
    let { _id } = req?.user;
    const resImg = await cloudinary.uploader
      .upload(req?.files?.photoUrl?.tempFilePath)
      .then((data: any) => {
        return data;
      });
    fs.unlink(req?.files?.photoUrl?.tempFilePath, () => {});
    fs.rm(req?.files?.photoUrl?.tempFilePath, () => {});
    const updateOneUser = await UserModel.findByIdAndUpdate(_id, {
      photoUrl: resImg?.url,
      name,
      mobileNumber,
      gender,
    });
    if (!updateOneUser) {
      return res?.status(400).json({
        message: "User Update Failed",
        status: 400,
      });
    } else {
      return res?.status(200).json({
        data: updateOneUser,
        message: "User Update Success",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req: any, res: any) => {
  try {
    const response = await UserModel.find();
    if (!response) {
      return res?.status(400).json({
        message: "User Get Failed",
        status: 400,
      });
    } else {
      return res?.status(200).json({
        data: response,
        message: "User Get Success",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserSelf = async (req: any, res: any) => {
  try {
    const { _id } = req?.user;
    const response = await UserModel.findOne({ _id: _id });
    console.log({ response });
    if (!response) {
      return res?.status(400).json({
        message: "User Get Failed",
        status: 400,
      });
    } else {
      return res?.status(200).json({
        data: response,
        message: "User Get Success",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req: any, res: any) => {
  let { id } = req?.params;
  try {
    const response = await UserModel.findOne({ _id: id });
    console.log({ response });
    if (!response) {
      return res?.status(400).json({
        message: "User Get Failed",
        status: 400,
      });
    } else {
      return res?.status(200).json({
        data: response,
        message: "User Get Success",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { UpdateUser, getAllUser, getUserSelf, getUserById };
