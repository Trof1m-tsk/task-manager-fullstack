const { Router } = require('express');
const Task = require('../models/Task');

const router = Router();

router.get('/getAll', async ( req, res ) => {
  console.log('GET ALL Request');
  const tasks = await Task.find({});

  res.json(tasks);
});

router.post('/create', async ( req, res ) => {
  try {
    const task = req.body;

    console.log('>>>> REQ body: ', task);
    const newTask = new Task(task);
    await newTask.save();

    res.status(201).json(newTask);
  } catch (e) {
    console.error('>>> ERROR: ', e);
  }
});

router.post('/update', async ( req, res ) => {
  try {
    const task = await Task.findOne({ id: req.body.id });
    task.task = { ...req.body.task };
    task.history = [...req.body.history];

    await task.save();

    res.status(200).send(`Task with id ${ req.params.id } was successfully deleted.`);
  } catch (e) {
    console.error('>>> ERROR: ', e);
  }
});

router.delete('/delete', async ( req, res ) => {
  try {
    // const task = await Task.findOne({id: req.params.id});
    //
    // await task.deleteOne();

    Task.deleteOne({ id: req.params.id });

    res.status(200).json(task);
  } catch (e) {
    console.error('>>> ERROR: ', e);
  }
});

router.get('/:id', async ( req, res ) => {
  try {
    const task = await Task.findOne({ id: req.params.id });

    res.status(200).json(task);
  } catch (e) {
    console.error('>>> ERROR: ', e);
  }
});

router.get('*', ( req, res ) => {
  res.status(404).json({ message: 'Invalid path', code: 404 });
});

module.exports = router;
