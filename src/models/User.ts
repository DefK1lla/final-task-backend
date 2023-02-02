import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    required: false,
    type: String,
  },
});

export default mongoose.model('User', userSchema);
