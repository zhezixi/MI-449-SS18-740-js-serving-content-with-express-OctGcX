var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var articles = {}

function createArticle (article) {
  var id = Object.keys(articles).length
  article.createdAt = new Date()
  articles[id] = article
}

createArticle({
  title: 'DJI Spark',
  content: 'Entry level selfie drone.',
  link: '/spark',
  image: '/spark.jpg',
  page: 'pages/pagetemp'
})

createArticle({
  title: 'DJI Mavic Pro',
  content: 'Advance level camera drone.',
  link: '/mavic',
  image: '/mavic.jpg',
  page: 'pages/pagetemp'
})

createArticle({
  title: 'DJI Phantom 4 Pro',
  content: 'Professional level camera drone.',
  link: '/p4p',
  image: '/p4p.png',
  page: 'pages/pagetemp'
})

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function (request, response) {
  response.render('pages/index', {
    articles: articles
  })
})

Object.keys(articles).forEach(function (id) {
  app.get(articles[id].link, function (request, response) {
    response.render(articles[id].page, {
      articles: articles,
      drone: articles[id]
    })
  })
})

app.listen(port)
