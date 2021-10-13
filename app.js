const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express()

//coonect to mongo db

const dbURI =
  'mongodb+srv://@cluster1.spdks.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to db')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

//middleware static files

app.use(express.static('public'))
app.use(morgan('dev'))

//mongoose and mongo sandbox

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'All Blogs',
        blogs: result,
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

//blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
