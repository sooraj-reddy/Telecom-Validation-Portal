import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: Number,
  fileType: String,
  response: { type: String, required: true},
  timestamp: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobtitle: { type: String, required: true},
  questions: [questionSchema]
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
