import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    if ((username === "admin", password === "admin1234")) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ message: "Login Successful", admin: username });
    } else {
      return next(errorHandler(404, "Wrong Credentials"));
    }
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req, res, next) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(200).json("User is deleted");
  } catch (error) {}
};

export const userData = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    // const {username, email} = req.body;
    const editUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({username, email, password:hashedPassword});
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfullyl" });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signout success!");
  } catch (error) {
    next(error);
  }
};
