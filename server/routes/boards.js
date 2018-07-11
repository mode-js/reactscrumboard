// middleware
const boardController = require('../controllers/boardController');

module.exports = (app, pool) => {
  // & All API GET requests:
  app.get('/api/boardSettings/:id',
    boardController(pool).getBoard,
    boardController(pool).getPermittedUsers,
    (req, res) => {
      res.send(res.locals.boardinfo);
    });

  app.get('/api/getboards',
    boardController(pool).getBoard,
    (req, res) => {
      res.send(res.locals.cards);
    });

  // % All API Post Requests:
  app.post('/api/createboard',
    boardController(pool).createBoard,
    boardController(pool).addPermittedUsers,
    (req, res) => {
      res.send({ board_id: res.locals.board_id });
    });
  /*
    app.post('/api/docSettings',
      dbController(pool).editDocTitle,
      dbController(pool).deletePermittedUsers,
      dbController(pool).addPermittedUsers,
      (req, res) => {
        res.send('Document settings updated!');
      });
  */

  // PUT req - save text_content and update last_updated
  app.put('/api/board/:id',
    boardController(pool).saveBoardContent,
    (req, res) => {
      res.send("Board successfully saved!");
    }
  )

}
