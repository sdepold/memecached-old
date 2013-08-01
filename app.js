/*global require, __dirname, process, console*/

var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , db      = require('./models')
  , stylus  = require('stylus')
  , nib     = require('nib')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(stylus.middleware({
  src:     path.join(__dirname, 'public'),
  compile: function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
}))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/memes/:id', routes.index)

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    })
  }
})
