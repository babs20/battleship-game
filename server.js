// IMPORT
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const app = express();
const PORT = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['some-value'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('battle-screen');
});

// PORT LISTEN //
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
