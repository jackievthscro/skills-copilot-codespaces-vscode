// Create web server

// Import express module
const express = require('express');

// Import body-parser module
const bodyParser = require('body-parser');

// Import mongoose module
const mongoose = require('mongoose');

// Import path module
const path = require('path');

// Create express application
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Import Comment model
const Comment = require('./models/comment');

// Set up routes
app.get('/', (req, res) => {
  Comment.find()
    .then(comments => {
      res.render('index', { comments });
    })
    .catch(err => console.log(err));
});

app.post('/comment/add', (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });
  newComment.save()
    .then(comment => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('Server started on port 3000'));