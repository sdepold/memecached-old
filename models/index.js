if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_GRAY_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_GRAY_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('memecached', 'root', null)
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Meme:      sequelize.import(__dirname + '/meme')

    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db
