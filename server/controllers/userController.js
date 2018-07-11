const { SimpleUser, User, fetchMongoData } = require('../mongo.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
const SALT_WORK_FACTOR = 10;
const JWT_SECRET = "somesecretfordeluge";

const userController = {

  login: (req, res) => {
    SimpleUser.find({ name: req.body.username }, (err, resMongo) => {
        if (err) res.send(err);
        if ( !resMongo ) return res.send({ error: 'username or password incorrect' });
        else {
          const userData = resMongo[0];
          bcrypt.compare(req.body.password, userData.password, function(err, valid) {
            if (!valid) {
              return res.status(404).json({
                error: true,
                message: "message"
              });
            } else {
              const token = generateToken(userData);
              res.json({token: token});
            }
          });
        } 
      });
  },

  signup: (req, res) => {
    SimpleUser.find({ name: req.body.username }, (err, resMongo) => {
        if (resMongo.length) {
          res.send({ error: 'user exists' });
        } else {
          var body = req.body;
          var hash = bcrypt.hashSync(
            body.password.trim(),
            bcrypt.genSaltSync(SALT_WORK_FACTOR)
          );
          SimpleUser.create(
            { name: body.username, password: hash },
            (err, resMongo) => {
              const token = generateToken(resMongo);
              res.json({token: token});
            }
          );
        }
      });
  },

  getusers: (req, res) => {
    SimpleUser.find({}, (err, resMongo) => {
        res.json(resMongo);
    });
  },
}

module.exports = userController;

function generateToken(user) {
    var u = {
      username: user.username,
      password: user.password,
    };
    return (token = jwt.sign(u, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    }));
  }

// app.post('/logout', (req, res) => {
//   SimpleUser.findOneAndUpdate({ _id: req.body._id }, { isLoggedIn: false }, (err, resMongo) => {
//     res.send('logged-out');
//   });
// });