import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      number,
      address,
      firstName,
      lastName,
      DOB,
      gender,
      image,
    } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role:  "user", 
      number,
      address,
      firstName,
      lastName,
      DOB,
      gender,
      image: image || undefined,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username,
        email,
        role: user.role,
        number,
        address,
        firstName,
        lastName,
        DOB,
        gender,
        image: user.image,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email,
        role: user.role,
        number: user.number,
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName,
        DOB: user.DOB,
        gender: user.gender,
        image: user.image,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
