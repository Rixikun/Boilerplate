const router = require('express').Router();
const express = require('express');
const app = express();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

module.exports = router;
