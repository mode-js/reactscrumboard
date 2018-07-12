const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const taskController = require('./controllers/taskController');
const boardController = require('./controllers/boardController');
const storyController = require('./controllers/storyController');
const userController = require('./controllers/userController');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public', 'dist');
const app = express();

const db = require('./models');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cookieParser());

// USER ROUTES
app.get('/getusers', userController.getusers);
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/logout', userController.logout);

/// TASK ROUTES
app.get('/tasks/id?:id', userController.checkUserAuth, taskController.getTasks);
app.post('/tasks', userController.checkUserAuth, taskController.addTask);
app.post('/updatetasks', userController.checkUserAuth, taskController.updateTask);
app.delete('/tasks', userController.checkUserAuth, taskController.deleteTask);
app.get('/alltasks', userController.checkUserAuth, taskController.getAllTasks);

/// STORY ROUTES
app.get('/stories/id?:id', userController.checkUserAuth, storyController.getStories);
app.post('/stories', userController.checkUserAuth, storyController.addStory);
app.post('/updatestories', userController.checkUserAuth, storyController.updateStory);
app.delete('/stories', userController.checkUserAuth, storyController.deleteStory);
app.get('/allstories', userController.checkUserAuth, storyController.getAllStories);

//BOARD ROUTES
app.get('/boards/id?:id', userController.checkUserAuth, boardController.getBoards);
app.post('/boards', userController.checkUserAuth, boardController.addBoard);
app.delete('/boards', userController.checkUserAuth, boardController.deleteBoard);
app.get('/allboards', userController.checkUserAuth, boardController.getAllBoards);

app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

db.sequelize.sync().then(function () {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}).catch((err) => console.error(err));
