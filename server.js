const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

const db = mongojs(
  process.env.MONGODB_URI,
  ['repo', 'classes', 'lessons', 'subcategories', 'curricula', 'tokens']
);

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

const createToken = () => {
  const token =  Math.floor(Math.random() * Math.floor(100000000000));
  return new Promise((resolve, reject) => {
    db.tokens.insert({
      'token': token,
      'issued': new Date
    }, (err, result) => {
      if(err) reject(err);
      resolve(result);
    });
  });
  
  
}

app.post('/api/data', (req, res) => {
  console.log('token', req.body.token);
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
    })
    .catch(err => {
      console.error(err);
    });
});

app.post('/api/auth', (req, res) => {
  if(req.body.password === process.env.PASSWORD) {
    createToken()
      .then(data => {
        res.json({ auth: true, token: data.token });
      })
      .catch(err => {
        console.error(err);
      });
    
  } else {
    res.json({ auth: false, error: 'password' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎  Server now on port ${PORT}!`);
});
