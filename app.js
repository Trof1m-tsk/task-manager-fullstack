const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 5000;

const MONGO_URL = 'mongodb+srv://MikhailTrofimov:mongotaskmanager@cluster0.gf0sfu8.mongodb.net/?retryWrites=true&w=majority'

// обозначить роуты
app.use(express.json({extended: true}));
app.use('/api/tasks', require('./routes/tasks'))

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log('Mongo DB has been connected.');

    app.listen(PORT, () => console.log(`>>> >>> Application has been started on port ${PORT}.`));
  } catch (e) {
    console.log(e);
  }
}

start()
  .then(() => console.log('Server has been started.'));
