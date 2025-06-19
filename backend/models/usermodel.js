import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  number: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  DOB: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  image: { type: String, trim: true , default: 'https://www.dpzone.in/wp-content/uploads/2/Twitter-Default-PFP-44.jpg' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;