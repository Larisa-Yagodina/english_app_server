import mongoose from 'mongoose';
const { Schema } = mongoose;

const userWordSchema = new Schema({
  word:  {type: String, required: true},
  partOfSpeech: {type: String, required: true},
  definition:   {type: String, required: true},
  russianEquivalent: {type: String, required: true},
  isStudied: {type: Boolean, required: true},
  userId: {type: String, required: true},
});

export default mongoose.model('UserWord', userWordSchema);
