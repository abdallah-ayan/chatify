import jwt from "jsonwebtoken";
import User from "../model/User.js";
import "dotenv/config";
import util from "util";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookie = socket?.handshake?.headers?.cookie;

    const token = cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("No token"));
    }

    const verify = util.promisify(jwt.verify);

    const payload = await verify(
      token,
      process.env.TOKEN_KEY
    );

    const id = payload.userId;

    const user = await User.findById(id);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (err) {
    next(err);
  }
};