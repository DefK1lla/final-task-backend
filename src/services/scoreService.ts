import type { ObjectId } from 'mongoose';
import type { IScore } from 'src/types/Score';

import Score from '../models/Score';

class ScoreService {
  create = async (score: Omit<IScore, '_id'>): Promise<IScore> => {
    const newScore = new Score(score);
    await newScore.save();
    return newScore;
  };

  getUserLastResults = async (
    user: ObjectId,
    game: string
  ): Promise<IScore> => {
    const score = await Score.find({ user, game })
      .select({ game: 0 })
      .sort({ date: -1 })
      .limit(1)
      .lean();

    return score[0];
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
    })
      .select({ game: 0 })
      .sort({ date: -1 })
      .lean();

    return score;
  };

  getUserBestResults = async (
    user: ObjectId | String,
    game: string
  ): Promise<IScore[]> => {
    const score = await Score.find({
      user,
      game,
    })
      .select({ game: 0 })
      .sort({ score: -1 })
      .limit(5)
      .lean();
    return score;
  };

  getLeaders = async (game: string): Promise<IScore[]> => {
    const leaders = await Score.find({ game })
      .select({ game: 0 })
      .sort({ score: -1 })
      .limit(10)
      .populate({ path: 'user', select: 'username' })
      .lean();
    return leaders;
  };
}

export default new ScoreService();
