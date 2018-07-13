const { Board } = require('../models');

const boardController = {

  getBoards: (req, res) => {
    Board.findAll({
      where: { owner_id: req.user._id },
    })
      .then(board => {
        res.status(200).json(board);
      })
      .catch(err => {
        res.status(400).send(`Board(s) not found: ${err}`);
      });
  },

  deleteBoard: (req, res) => {
    Board.destroy({
      where: {
        owner_id: req.user._id,
        _id: req.query._id,
      }
    })
      .then(board => {
        console.log(board);
        res.status(200).send(board);
      })
      .catch(err => res.status(400).send(`Board not deleted: ${err}`));
  },

  addBoard: (req, res) => {
    Board.create({
      title: req.body.name,
      owner_id: req.user._id,
    })
      .then(board => {
        res.status(200).json(board);
      })
      .catch(err => {
        res.status(400).send(`Board not created: ${err}`);
      });
  },

  getAllBoards: (req, res) => {
    Board.findAll({
      where: {
        owner_id: req.user._id,
      }
    })
      .then(boards => {
        res.status(200).json(board);
      })
      .catch(err => {
        res.status(400).send(`Board(s) not found: ${err}`)
      });
  }
}

module.exports = boardController;