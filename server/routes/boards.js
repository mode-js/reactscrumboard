// middleware
const dbController = require('../controllers/dbController');

module.exports = (app, pool) => {
  // define document routes here...

  // & All API GET requests:
  app.get('/api/boardSettings/:id',
    dbController(pool).getBoard,
    dbController(pool).getPermittedUsers,
    (req, res) => {
      res.send(res.locals.boardinfo);
    });

  app.get('/api/getboards',
    dbController(pool).getBoard,
    (req, res) => {
      res.send(res.locals.cards);
    });

  // % All API Post Requests:
  app.post('/api/createboard',
    dbController(pool).createBoard,
    dbController(pool).addPermittedUsers,
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
    dbController(pool).saveBoardContent,
    (req, res) => {
      res.send("Board successfully saved!");
    }
  )

}
