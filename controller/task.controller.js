const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: 'ok', data: newTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v');
    res.status(200).json({ status: 'ok', data: taskList });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const editTask = await Task.findById(req.params.id);
    if (!editTask) {
      throw new Error('not found task !');
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (editTask[item] = req.body[item]));
    await editTask.save();
    res.status(200).json({ status: 'success', data: editTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: 'fail', err });
  }
};

module.exports = taskController;
