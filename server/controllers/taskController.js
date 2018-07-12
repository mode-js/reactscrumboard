const Task = require('../mongoModels/task');

const taskController = {

  getAllTasks: (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  deleteTask: (req, res) => {
    Task.deleteOne({ _id: req.body._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  getTasks: (req, res) => {
    Task.find({ boardId: req.query.id }, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  addTask: (req, res) => {
    Task.create({
      boardId: req.body.boardId,
      name: req.body.name,
      status: req.body.status
    }).then(result => res.json(result))
      .catch(err => console.error(err));
  },

  updateTask: (req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status }, { new: true }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = taskController;