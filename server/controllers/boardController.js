const Board = require('../models/board');

const boardController = {
  getBoards: (req, res) => {
    Board.find({ userId: req.query.user_id }, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  deleteBoard: (req, res) => {
    Board.deleteOne({ _id: req.query._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  addBoard: (req, res) => {
    Board.create({
      userId: req.body.userId,
      name: req.body.name
    }).then(result => res.json(result))
      .catch(err => console.error(err));
  },

  getAllBoards: (req, res) => {
    Board.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = boardController;
