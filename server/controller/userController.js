const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
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
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Password is valid, user is authenticated
    // Here you can store user data in session or generate a JWT token
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy(); // Destroy session (for session-based authentication)
  res.status(200).json({ message: 'Logout successful' });
};
