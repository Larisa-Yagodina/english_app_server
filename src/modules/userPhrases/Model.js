import mongoose from 'mongoose';
const { Schema } = mongoose;

const userPhrasesSchema = new Schema({
  english:  {type: String, required: true},
  russian: {type: String, required: true},
  note:   {type: String, required: false},
  wordId: {type: String, required: false},
  isStudied: {type: Boolean, required: true},
  userId: {type: String, required: true},
});

export default mongoose.model('UserPhrase', userPhrasesSchema);
