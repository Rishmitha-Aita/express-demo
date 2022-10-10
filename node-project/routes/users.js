const express = require('express');

const router = express.Router();

const users = [
  { id: 1, name: 'Maya' },
  { id: 2, name: 'Tara' },
  { id: 3, name: 'Riya' },
  { id: 4, name: 'Sana' },
  { id: 5, name: 'Megha' },
];

router.get('/', (req, res) => {
  // localhost:3000/users/new?name="Jennifer"
  console.log('req.query.nameofParameter', req.user);
  res.send(users);
});

router.get('/new', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  if (req.body.name !== '') {
    users.push(user);
    res.redirect('/users');
  } else {
    console.log('error');
    res.status(400).json({ error: 'Input name is not sent' });
  }
});

router.route('/:id').get((req, res) => {
  console.log('present user', req.user);
  res.send(`Get the user with id ${req.params.id} ${req.user.name}`);
}).put((req, res) => {
  const user = users.find((m) => m.id === parseInt(req.params.id, 10));
  console.log(req.body.name);
  user.name = 'Mishal';
  res.send(`Updated the user with id ${req.params.id} ${req.user.name}`);
}).delete((req, res) => {
  console.log(req.user);
  res.json(`Deleted the user with id ${req.params.id} ${req.user.name}`);
});

router.param('id', (req, res, next, id) => {
  console.log(users);
  if (id > users.length) {
    res.send(`User with id ${req.params.id} is not found`);
  }
  req.user = users[id - 1];
  next();
});

// if we put this after the above dynamic routes it will print o/p as "Get the user with id new"
// so always place static before dynamic content
router.get('/new', (req, res) => {
  res.render('users/new', { name: 'Madhu' });
});

module.exports = router;
