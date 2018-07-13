const { User } = require('../models');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const SALT_WORK_FACTOR = 10;
const JWT_SECRET = process.env.JWT_SECRET || "somesecretfordeluge";

const userController = {

  //Signup method that checks if user exists and hashes new password and stores in database:
  signup: (req, res) => {
    const { username, password } = req.body;
    User.findOne({
      where: { username }
    })
      .then(user => {
        if (user) {
          return res.status(400).send('Error, this user exists');
        }
        else {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
          User.create({ username, password: hash, })
            .then(
              (newUser) => {
                const token = generateToken(newUser);
                res.cookie('usertoken', token, { maxAge: 900000, httpOnly: true });
                res.status(200).send("Successful User Creation");
              })
            .catch(err => {
              res.status(400).send(`User create failed: ${err}`);
            })
        }
      })
  },

  login: (req, res) => {
    const { username, password } = req.body;
    User.findOne({
      where: { username }
    })
      .then(
        user => {
          const match = bcrypt.compareSync(password, user.password)
          if (!match) {
            return res.status(400).send('Invalid Username or Password');
          }
          else {
            const token = generateToken(user);
            res.cookie('usertoken', token, { maxAge: 900000, httpOnly: true });
            res.status(200).send("Successful Login");
          }
        }
      )
      .catch(err => {
        res.status(400).send(`User create failed: ${err}`);
      })
  },

  logout: (req, res) => {
    res.clearCookie('usertoken', { maxAge: 900000, httpOnly: true });
    res.send("User Logged Out");
  },

  getusers: (req, res) => {
    User.find({}, (err, res) => {
      res.json(res);
    });
  },

  checkUserAuth: (req, res, next) => {
    const token = req.cookies.usertoken;
    if (!token) return res.status(403).send("No user token provided.");
    jwt.verify(token, JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Please register Log in using a valid email to submit posts"
        });
      } else {
        req.user = user;
        next();
      }
    });
  },
}

function generateToken(user) {
  const u = {
    _id: user._id,
    username: user.username,
    password: user.password,
  };
  return (token = jwt.sign(u, JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  }));
}

module.exports = userController;