import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isActivated: {type: String, required: false},
  activationLink: {type: String}
});

export default mongoose.model('User', userSchema);
