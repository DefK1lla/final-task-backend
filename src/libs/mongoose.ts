import mongoose from 'mongoose';

import { MONGODB_URI } from '../utils/config';

mongoose.set('strictQuery', false);
mongoose.connect(`${MONGODB_URI}`, () =>
  console.log('connected to mongodb')
);

export default mongoose;
