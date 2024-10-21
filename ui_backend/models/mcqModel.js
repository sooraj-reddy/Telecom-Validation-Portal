// models/mcqModel.js
import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String,
  explanation: String,
  source: String,
  section: String,
  workingGroup: String,
  series: String
});

const MCQ = mongoose.model('MCQ', mcqSchema);

export default MCQ;