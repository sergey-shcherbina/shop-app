const sequelize = require("./db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"} 
})
const Flower = sequelize.define("flower", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  text: {type: DataTypes.TEXT, allowNull: false}
})
const Rating = sequelize.define("rating", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}
})
const Group = sequelize.define("group", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false}
})
const Review = sequelize.define("review", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.TEXT, allowNull: false} 
})
const Image = sequelize.define("image", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING, allowNull: false}
})
const Photo = sequelize.define("photo", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING, allowNull: false}
})
const Basket = sequelize.define("basket", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketFlower = sequelize.define("basket_flower", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Review)
Review.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketFlower)
BasketFlower.belongsTo(Basket)

Group.hasMany(Flower)
Flower.belongsTo(Group)

Flower.hasMany(BasketFlower)
BasketFlower.belongsTo(Flower)

Flower.hasMany(Rating)
Rating.belongsTo(Flower)

Flower.hasMany(Review)
Review.belongsTo(Flower)

Flower.hasMany(Image)
Image.belongsTo(Flower)

module.exports = {
  User,
  Basket,
  BasketFlower,
  Group,
  Flower,
  Rating,
  Review,
  Image,
  Photo
}
