const { Card } = require('../models');

const cardController = {

  getCards: (req, res) => {
    Card.findAll({
      where: { board_id: req.query.board_id },
    })
      .then(cards => {
        res.status(200).json(cards);
      })
      .catch(err => res.status(400).send(`Card(s) cannot be found: ${err}`));
  },

  deleteCard: (req, res) => {
    Card.deleteOne({
      where: { _id: req.query._id }
    })
      .then(confirm => {
        console.log(confirm);
        res.status(200).send(`Card has been deleted: ${confirm}`);
      })
      .catch(err => res.status(400).send());
  },

  addCard: (req, res) => {
    const { boardId, name, status } = req.body;
    Card.create({
      board_id: boardId,
      title: name,
      status: status,
    })
      .then(card => res.status(200).res.json(result))
      .catch(err => res.status(400).send(`Card not added: ${err}`));
  },

  //not totally sure how to run this update.  Pushing code for now and can figure it out later.
  updateCard: (req, res) => {
    Card.update(

      { where: { title: req.body.name } },

    )

    Card.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status }, { new: true }, (err, card) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
}

module.exports = cardController;