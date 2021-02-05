// IMPORT
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;
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
  res.render('main-view');
});

app.post('/', (req, res) => {
  const pos = req.body;
  const templateVars = {
    carrier: pos.carrier,
    battleship: pos.battleship,
    cruiser: pos.cruiser,
    submarine: pos.submarine,
    destroyer: pos.destroyer,
  };
  res.render('main-view', templateVars);
});

app.get('/new', (req, res) => {
  res.render('new-game');
});

// PORT LISTEN //
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
