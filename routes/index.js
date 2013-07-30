/*global require, exports*/

var db = require('../models')

exports.index = function(req, res) {
  db.Meme.findAll().success(function(memes) {
    res.render('index', {
      title: '',
      memes: memes.map(function(m) { return m.values })
    })
  })
}
