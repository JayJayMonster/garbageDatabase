require('dotenv').config();

//Connect Mongoose package
let mongoose = require('mongoose');

//Connect package with web server
const express = require('express');

//Make the app available
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

//DB validation
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to database'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

let router = require('./routes/allRoutes');

app.use('/creativegarbage', router);

app.listen(process.env.PORT, () => console.log('Server started'));
