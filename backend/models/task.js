import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdBy: { type: mongoose.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', taskSchema);
