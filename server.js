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

const validateToken = token => {
  token = parseInt(token);
  return new Promise((resolve, reject) => {
    db.tokens.find({ 'token': token }, (err, result) => {
      if(result.length >= 1) {
        resolve({ found: true });
      } else {
        reject({ found: false });
      }
    });
  });
}

app.post('/api/data', (req, res) => {
  validateToken(req.body.token)
    .then(result => {
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
    })
    .catch(err => {
      res.status(403).json({ auth: false, error: 'token not found' });
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
    res.status(401).json({ auth: false, error: 'password' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎  Server now on port ${PORT}!`);
});
