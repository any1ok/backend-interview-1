
import db from './dbms/postgre'

db.sequelize.sync({ force: true });
const express = require('express');
const cookieParser = require('cookie-parser');

const api = require('./router');

const app = express();
db.sequelize.sync({ force: true });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require(`${__dirname}/middleware/jwtAuth`));
app.use('/api', api);

app.get('/', (req, res) => {
  res.json({ version: '0.0.0' });
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404)
});

// error handlers
// Handle Handled ERROR
app.use((err, req, res) => {
  return res.status(err.statusCode)
});

export default app
