const axios = require("axios");
const { ResponseMessage } = require("../constants");
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;


const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .send({ message: ResponseMessage.AUTHORIZATION_TOKEN_IS_MISSING });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/user/verifyToken`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    if (response.data.valid) {
      next();
    } else {
      return res
        .status(401)
        .send({ message: ResponseMessage.AUTHORIZATION_TOKEN_IS_INVALID });
    }
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { verifyUser };
