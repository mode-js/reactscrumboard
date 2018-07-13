const { Card } = require('../models');

const taskController = {

  getTasks: (req, res) => {
    Card.findAll({
      where: {
        board_id: req.query.board_id,
        status: { $gt: 0 },
      },
    })
      .then(task => res.status(200).json(task))
      .catch(err => res.status(400).send(`Task cannot be found: ${err}`));
  },

  addTask: (req, res) => {
    const { boardId, name, status } = req.body;
    Card.create({
      board_id: boardId,
      title: name,
      status: status,
    })
      .then(task => res.status(200).json(task))
      .catch(err => res.status(400).send(`Task not added: ${err}`));
  },

  updateTask: (req, res) => {
    Card.update(req.body, {
      where: { _id: req.body._id },
    })
      .then(task => res.status(200).json(task))
      .catch(err => res.status(400).send(`Task was not updated: ${err}`));
  },

  deleteTask: (req, res) => {
    Card.destroy({
      where: {
        _id: req.query._id,
      }
    })
      .then(confirm => {
        console.log(confirm);
        res.status(200).send(`Task has been deleted: ${confirm}`);
      })
      .catch(err => res.status(400).send(`Task could not be deleted: ${err}`));
  },
}

module.exports = taskController;
