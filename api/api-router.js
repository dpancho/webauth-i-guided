const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req,res) => {
  //read password from body
  const password = req.body.password;

  //hash password
  const hash = bcrypt.hashSync(credentials.password, 14);

  //display password
  res.status(200).json({ password, hash })

  // credentials.password = hash;
})

module.exports = router;
