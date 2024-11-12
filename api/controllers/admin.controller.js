import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
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



