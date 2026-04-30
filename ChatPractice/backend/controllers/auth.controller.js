const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const COOKIE_NAME = "token";

const createToken = (userId) =>
  jwt.sign({ id:userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const setTokenCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6366f1&color=fff`;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    const token = createToken(user._id);
    setTokenCookie(res, token);

    return res.status(201).json({
      message: "Signup successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken(user._id);
    setTokenCookie(res, token);

    return res.status(200).json({
      message: "Login successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error." });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error." });
  }
};

const logout = async (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logout successful." });
};

module.exports = {
  signup,
  login,
  getUsers,
  logout,
};
