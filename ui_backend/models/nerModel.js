// models/nerModel.js
import mongoose from 'mongoose';

const nerSchema = new mongoose.Schema({
  name: String,
  full_form: String,
  entity_type: String,
  comments: String, // Assuming Comments is a text field
  context: String, // Assuming Context is a text field
  description: String,
  explanation:String, // Assuming Explanation is a text field
  section_title: String // Assuming Section Title is a text field
});

const NER = mongoose.model('NER', nerSchema);

export default NER;