module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Meme", {
    image_url:   DataTypes.STRING,
    text_top:    DataTypes.STRING,
    text_bottom: DataTypes.STRING
  })
}
