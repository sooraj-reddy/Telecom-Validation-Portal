import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './models/users.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI);

app.post('/saveResponse', (req, res) => {
  const { username, questionId, fileType, response } = req.body;

  UserModel.findOneAndUpdate(
    { username: username },
    {
      $push: { questions: { questionId, fileType, response } },
    },
    { new: true, upsert: true }
  )
    .then((updatedUser) => res.json({ message: 'Response saved successfully', user: updatedUser }))
    .catch((err) => res.status(500).json({ error: 'Error saving response', details: err }));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("Please register first");
    }
  });
});

app.post('/register', (req, res) => {
  UserModel.create(req.body).then((users) => res.json(users)).catch((err) => res.json(err));
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CSV routes
app.get('/csv/mcq', (req, res) => {
  const mcqFilePath = path.join(__dirname, './data/MCQ_TelcoBench.csv');
  let results = [];
  fs.createReadStream(mcqFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.get('/csv/descriptive', (req, res) => {
  const descriptiveFilePath = path.join(__dirname, './data/LONG_TelcoBench.csv');
  let results = [];
  fs.createReadStream(descriptiveFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.use(express.static(path.join(__dirname, '/ui_frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/ui_frontend/dist', 'index.html'));
});

app.get('/', (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
