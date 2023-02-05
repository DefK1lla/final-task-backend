import mongoose from '../libs/mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    required: false,
    type: String,
  },
  googleId: {
    required: false,
    type: String,
  },
});

export default mongoose.model('User', userSchema);
