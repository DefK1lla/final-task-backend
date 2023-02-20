import mongoose from '../libs/mongoose';

import type { IUser } from '../types/User';

const userSchema = new mongoose.Schema<IUser>({
  username: {
    required: true,
    type: String,
    unique: true,
    index: true,
  },
  password: {
    required: false,
    type: String,
  },
  googleId: {
    required: false,
    type: String,
    unique: true,
    index: true,
  },
  playedGames: {
    required: true,
    type: [{ type: String }],
    index: true,
  },
});

export default mongoose.model<IUser>('User', userSchema);
