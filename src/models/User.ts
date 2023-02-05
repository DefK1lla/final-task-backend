import mongoose from '../libs/mongoose';

import type { IUser } from '../types/User';

const userSchema = new mongoose.Schema<IUser>({
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

export default mongoose.model<IUser>('User', userSchema);
