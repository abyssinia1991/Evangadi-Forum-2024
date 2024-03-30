const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, user_id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, user_id };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid authorization token" });
  }
}

module.exports = auth;
