// models/descriptiveModel.js
import mongoose from 'mongoose';

const descriptiveSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  candidateAnswer1: String,
  candidateAnswer2: String,
  candidateAnswer3: String,
  explanation: String,
  source: String,
  section: String,
  workingGroup: String,
  series: String
});

const Descriptive = mongoose.model('Descriptive', descriptiveSchema);

export default Descriptive;