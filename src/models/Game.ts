import mongoose from '../libs/mongoose';

import type { IScore } from 'src/types/Score';

const gameSchema = new mongoose.Schema<IScore>({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  game: {
    required: true,
    type: String,
  },
  score: {
    required: true,
    type: String,
  },
  correct: {
    required: false,
    type: String,
  },
  accuracy: {
    required: false,
    type: String,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

gameSchema.index({ user: 1, game: 1 }, { unique: true });

export default mongoose.model<IScore>('Game', gameSchema);
