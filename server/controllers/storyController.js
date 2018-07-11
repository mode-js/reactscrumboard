const Story = require('../mongoModels/story');

const storyController = {
  getAllStories: (req, res) => {
    Story.find({}, (err, stories) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  getStories: (req, res) => {
    Story.find({ boardId: req.query.id }, (err, stories) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  addStory: (req, res) => {
    Story.create({
      boardId: req.body.boardId,
      name: req.body.name,
      done: req.body.done,
    })
      .then(result => res.json(result))
      .catch(err => console.error(err));
  },

  deleteStory: (req, res) => {
    Story.deleteOne({ _id: req.body._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },

  updateStory: (req, res) => {
    Story.findOneAndUpdate({ _id: req.body._id }, { done: req.body.done }, { new: true }, (err, story) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
};

module.exports = storyController;
