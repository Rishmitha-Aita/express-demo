/* eslint-disable no-use-before-define */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

const debug = require('debug')('app:startup');

const app = express();

// to enable export as env varibale like export DEBUG=app.startup
debug('Debugging.....');
// built-in middleware

// navigate to index1.html as localhost:port/index1.html
// test.html as localhost:port/tt/test.html
app.use(express.static('public'));

// allows you to view restricted request body
app.use(express.urlencoded({ extended: true }));

// does same as urlencoded but helps in acessing json data from the request body
app.use(express.json());

// customised middleware
app.use(logger);

// third party middleware morgan
// prints out every request accessed in server//logging http requests
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}
// third party middleware helmet
// secures express apps by setting various http headers , to avoid exposing express
// in header section
app.use(helmet());

app.set('view engine', 'ejs');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

app.get('/', (req, res) => {
  console.log('orginalUrl', req.originalUrl);
  //     res.sendStatus(500);
  //     res.status(200).send("Succesfully sent");
  //     res.status(500).json({ message : 'Error'});
  //     res.render("index", {text: "World", text123: "text123"});
  //     res.send("Hi there!!");
  res.json({ Message: 'Hello this is the json message i wanna send' });
  //    res.send(req.body);
});

const userRouter = require('./routes/users');

app.use('/users', userRouter);

function logger(req, res, next) {
  console.log(`logger url ${req.originalUrl}`);
  next();
}

app.listen(PORT);
