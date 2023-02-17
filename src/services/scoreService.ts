import type { IScore } from 'src/types/Score';

import Score from '../models/Score';

class ScoreService {
  create = async (score: Omit<IScore, '_id'>): Promise<void> => {
    const newUser = new Score(score);
    await newUser.save();
  };

  getByUserId = async (
    userId: string,
    distance: number
  ): Promise<IScore[]> => {
    const score = Score.find({
      user: userId,
      date: {
        $gt: new Date().getTime() - distance,
      },
    });

    return score;
  };
}
