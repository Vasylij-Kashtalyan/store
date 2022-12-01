const sequelize = require("../db");
const { DataTypes } = require("sequelize"); // клас DataTypes для описання типів

//----- модель(схема) користувача -------
const User = sequelize.define("user", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

//----- модель(схема) корзини -------
const Basket = sequelize.define("basket", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//----- модель(схема) корзини устройства -------
const BasketDevice = sequelize.define("basket_device", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//----- модель(схема) устройства -------
const Device = sequelize.define("device", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

//----- модель(схема) типа устройства
const Type = sequelize.define("type", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//----- модель(схема) бренда
const Brand = sequelize.define("brand", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//----- модель(схема) рейтинга
const Rating = sequelize.define("rating", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false }, //allowNull: false не може бути пустий
});

//----- модель(схема) інформамція устройства
const DeviceInfo = sequelize.define("device_info", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

//----- модель(схема) типа бренда
const TypeBrand = sequelize.define("type_brand", {
  //    тип число(INTEGER),       ключ первичний,
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// установлюємо звязок між моделями
User.hasMany(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  Device,
  BasketDevice,
  Type,
  Brand,
  Rating,
  DeviceInfo,
  TypeBrand,
};
