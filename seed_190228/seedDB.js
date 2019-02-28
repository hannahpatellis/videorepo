const mongojs = require('mongojs');
const repo = require('./repo.json');
const classes = require('./classes.json');
const lessons = require('./lessons.json');
const subcategories = require('./subcategories.json');
const curricula = require('./curricula.json');
require('dotenv').config();

const db = mongojs(process.env.MONGODB_URI,
                   ['repo', 'classes', 'lessons', 'subcategories', 'curricula']);

db.on('error', error => {
  console.log('Database Error: ', error);
});

// db.repo.insert(repo, (err, res) => {
//     if(err) throw err;
//     console.log('Repo insert complete');
// });

// db.classes.insert(classes, (err, res) => {
//     if(err) throw err;
//     console.log('Classes insert complete');
// });

// db.lessons.insert(lessons, (err, res) => {
//     if(err) throw err;
//     console.log('Lessons insert complete');
// });

// db.subcategories.insert(subcategories, (err, res) => {
//     if(err) throw err;
//     console.log('Subcategories insert complete');
// });

// db.curricula.insert(curricula, (err, res) => {
//     if(err) throw err;
//     console.log('Curricula insert complete');
// });


