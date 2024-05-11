const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET;

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.cookie('jwtToken', token, {
      path: '/',
      maxAge: 3600000,
      secure: false, // Change to true in production
    });
    res.cookie('hello', token, {
      path: '/world',
      maxAge: 3600000,
      secure: false, // Change to true in production
    });
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('jwtToken', { path: '/' });
  return res.status(200).json({ message: 'Logout successful' });
};
