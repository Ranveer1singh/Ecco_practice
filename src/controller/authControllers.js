const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require("validator");
const sanitizeHtml =require('sanitize-html');
const { generateToken } = require('../config/jwt');

exports.registerUser = async (req, res, next) => {
  try {
    const { FirstName, LastName, isAdmin, email, password } = req.body;

    // Input validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password does not meet complexity requirements' });
    }

    // Check if name and LastName are provided
    const sanitizedName = FirstName ? sanitizeHtml(FirstName) : '';
    const sanitizedLastName = LastName ? sanitizeHtml(LastName) : '';

    // Validate name and LastName if provided
    if (sanitizedName && !validator.isAlpha(sanitizedName, 'en-US', { ignore: ' ' })) {
      return res.status(400).json({ message: 'Name should only contain letters' });
    }
    if (sanitizedLastName && !validator.isAlpha(sanitizedLastName, 'en-US', { ignore: ' ' })) {
      return res.status(400).json({ message: 'Last name should only contain letters' });
    }

    // Data sanitization
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPassword = sanitizeHtml(password);

    // Check for existing user
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      FirstName: sanitizedName,
      LastName: sanitizedLastName,
      isAdmin: isAdmin ,
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    // Generate authentication token
    const token = generateToken({ userId: user._id, email: user.email });
    res.status(201).json({ 
      message:"User Created Successfully",
      token : token
    });

  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received:', email, password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user._id });
    console.log('Login successful');
    res.status(200).json({
      success: true,
      data: {
        userId: user,
        token: token,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    next(err);
  }
};


exports.logoutUser = async (req,res,next)=>{
    try {
        req.user.deleteToken(req.token,(err))
        
    } catch (err) {
        console.error('Login error:', err);
        next(err);
      }
}