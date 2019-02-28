const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

const db = mongojs(process.env.MONGODB_URI, ['repo', 'classes', 'lessons', 'subcategories', 'curricula']);

db.on('error', error => {
  console.log('Database Error: ', error);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const getData = collection => {
  return new Promise((resolve, reject) => {
    db[collection].find({}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

app.get('/api/data', (req, res) => {
  Promise.all([
      getData('repo'),
      getData('classes'),
      getData('lessons'),
      getData('subcategories'),
      getData('curricula')
    ])
    .then(data => {
      let ret = {
        repo: data[0],
        classes: data[1],
        lessons: data[2],
        subcategories: data[3],
        curricula: data[4]
      };
      res.json(ret);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎  Server now on port ${PORT}!`);
});
