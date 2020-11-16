import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
);

userSchema.method('validatePassword', async function (userEnteredPassword) {
  try {
    const isMatch = await bcrypt.compare(userEnteredPassword, this.password);
    if (!isMatch) {
      return new Error('Invalid credentials');
    }

    const token = await jwt.sign(
      { userId: this.id },
      process.env.JWT_SECRET_KEY
    );

    if (!token) {
      return new Error('Authentication failed');
    }
    return { token, userId: this.id };
  } catch (err) {
    return new Error('Authentication failed');
  }
});

export default mongoose.model('User', userSchema);
