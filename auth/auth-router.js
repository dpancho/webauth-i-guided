const router = require('express').Router();

const Users = require('../users/users-model.js');
var bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  let credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;

  Users.add(credentials)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/hash', (req, res) => {
  const password = req.body.password;
  let hash = bcrypt.hashSync(password, 100);
  res.status(200).json({ password: password, hash: hash })
  // read a password from the body
  // has the password
  // return it to the user in an object that looks like
  // { password: 'original password', hash: 'hashed password' }
})
module.exports = router;
