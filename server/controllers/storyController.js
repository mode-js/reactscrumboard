const { Card } = require('../models');

const storyController = {

  getStories: (req, res) => {
    Card.findAll({
      where: {
        board_id: req.query.board_id,
        status: 0,
      },
    })
      .then(story => res.status(200).json(story))
      .catch(err => res.status(400).send(`Story cannot be found: ${err}`));
  },

  addStory: (req, res) => {
    const { boardId, name, status } = req.body;
    Card.create({
      board_id: boardId,
      title: name,
      status: 0,
    })
      .then(story => res.status(200).json(story))
      .catch(err => res.status(400).send(`Story not added: ${err}`));
  },

  updateStory: (req, res) => {
    Card.update(req.body, {
        where: { _id: req.body._id }
      })
      .then(story => res.status(200).json(story))
      .catch(err => res.status(400).send(`Story was not updated: ${err}`));
  },

  deleteStory: (req, res) => {
    Card.destroy({
      where: {
        _id: req.query._id,
      }
    })
      .then(confirm => {
        console.log(confirm);
        res.status(200).send(`Story has been deleted: ${confirm}`);
      })
      .catch(err => res.status(400).send(`Story could not be deleted: ${err}`));
  },
}

module.exports = storyController;
