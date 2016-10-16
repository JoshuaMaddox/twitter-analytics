const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      Twitter = require('./models/Twitter'),
      webpackConfig = require('./webpack.config'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      InternalDataManagement = require('./models/InternalDataManagement');

//Express invocation
const app = express()
require('dotenv').config({ silent: true })

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use((req, res, next) => {
//   res.handle = (err, data) => res.status(err ? 400 : 200).send(err || data);
//   next();
// })

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

app.use('/search', require('./routes/search'))

app.get('/streaming', (req, res) => Twitter.twitterMap(res.handle))

// app.get('/twitter', (req, res) => Twitter.gather(res.handle))

// app.get('/infogather', (req, res) => Twitter.tweetGather(res.handle))

// app.get('/watson', (req, res) => Twitter.watson(res.handle))

// app.get('/formatData', (req,res) => Twitter.formatData(res.handle))

// //Show Route to See Data Object
// app.get('/checkObj', (req, res) => InternalDataManagement.makeTextObj(res.handle))

app.use("*", function(request,response) {
  response.sendFile(path.join(__dirname, "./build/index.html"))
})

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})


// const TMClient = require('textmagic-rest-client');
  
// let c = new TMClient('joshuamaddox', 'wzkogvz2FsckW23o7DD7JCc8wYagC7');
// c.Messages.send({text: 'Message Sent from my sweet node.js app.', phones:'19253534139'}, function(err, res){
//     console.log('Messages.send()', err, res);
// });