import mongoose from '../libs/mongoose';

import type { IScore } from '../types/Score';

const scoreSchema = new mongoose.Schema<IScore>(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    game: {
      required: true,
      type: String,
      index: true,
    },
    score: {
      required: true,
      type: String,
      index: true,
    },
    correct: {
      required: false,
      type: String,
      index: true,
    },
    accuracy: {
      required: false,
      type: String,
      index: true,
    },
    date: {
      required: true,
      type: Date,
      default: Date.now,
      index: true,
    },
    lastBoard: {
      required: false,
      type: Number,
      index: true,
    },
  },
  { versionKey: false }
);

scoreSchema.index({ user: 1, game: 1, date: 1 }, { unique: true });

export default mongoose.model<IScore>('Score', scoreSchema);
