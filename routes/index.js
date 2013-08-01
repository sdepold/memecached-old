/*global require, exports*/

var db = require('../models')

exports.index = function(req, res) {
  db
    .Meme
    .findAll()
    .success(function(memes) {
      if (req.param('id')) {
        db
          .Meme
          .find(req.param('id'))
          .success(function(meme) {
            res.render('index', {
              title: '',
              memes: memes.map(function(m) { return m.values }),
              meme:  meme.values
            })
          })
      } else {
        res.render('index', {
          title: '',
          memes: memes.map(function(m) { return m.values }),
          meme:  null
        })
      }
    })
}
