import type { ObjectId } from 'mongoose';
import type { IScore } from 'src/types/Score';

import Score from '../models/Score';

class ScoreService {
  create = async (score: Omit<IScore, '_id'>): Promise<IScore> => {
    const newScore = new Score(score);
    await newScore.save();
    return newScore;
  };

  getByUserId = async (
    userId: ObjectId,
    distance: number,
    game: string
  ): Promise<IScore[]> => {
    const score = Score.find({
      user: userId,
      game,
      date: {
        $gt: new Date().getTime() - distance,
      },
    });

    return score;
  };
}

export default new ScoreService();
