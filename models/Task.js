const { Schema, model } = require('mongoose');

const taskValueSchema = new Schema({
  type: String,
  title: String,
  description: String,
  status: String,
});

const historySchema = new Schema({
  comment: String,
  time: Number,
  author: String,
  previousValue: {
    type: taskValueSchema
  },
});

const taskSchema = new Schema({
  id: String,
  task: {
    type: taskValueSchema
  },
  createdBy: String,
  createdAt: Number,
  history: [{
    type: historySchema
  }],
})

module.exports = model('Task', taskSchema);
