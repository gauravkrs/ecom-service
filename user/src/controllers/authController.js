const { ResponseMessage } = require("../constants");
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken, generateRefreshToken } = require("../utils/jwtToken");

const registerUser = async (req, res) => {
  const { username, email, name, password } = req.body;
  if (!username || !email || !name || !password) {
    return res
      .status(400)
      .send({ message: ResponseMessage.ALL_FIELDS_ARE_REQUIRED });
  }
  try {
    const existingUser = await User.findOne({ email });
    //checking for existing user
    if (existingUser) {
      return res
        .status(400)
        .send({ message: ResponseMessage.EMAIL_IS_ALREADY_REGISTERED });
    }
    const encryptPassword = await hashPassword(password);
    const newUser = { username, email, name };
    // Create a new user
    const newUsers = new User({
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      password: encryptPassword,
    });
    // Save the user to the database
    await newUsers.save();
    res.status(201).send({ data: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  // Implement user login logic here
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: ResponseMessage.ALL_FIELDS_ARE_REQUIRED });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: ResponseMessage.USER_NOT_FOUND });
    }
    const isPasswordMatch = comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: ResponseMessage.INVALID_PASSWORD });
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, {
      refreshToken,
      refreshTokenExp: getRefreshTokenExpiration(),
    });
    res.status(200).send({ accesstoken: token, refreshToken: refreshToken });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const logoutUser = async (req, res) => {
  const { userName } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: userName },
      { refreshToken: null, refreshTokenExp: null }
    );
    res.status(200).send({ message: ResponseMessage.SUCCESS });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

const getRefreshTokenExpiration = () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Set refresh token expiration to 7 days from now
  return expirationDate;
};

const refreshToken = async (req, res) => {
  const { username, refreshToken } = req.body;

  try {
    const user = await User.findById(username);
    if (
      !user ||
      user.refreshToken !== refreshToken ||
      user.refreshTokenExp < new Date()
    ) {
      return res.status(401).send({ message: ResponseMessage.UNAUTHORIZED });
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    res.status(200).send({ token: token });
  } catch (error) {
    console.log("Refresh token error:", error);
    res.status(500).send({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { registerUser, loginUser, refreshToken };
