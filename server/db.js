const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME, // назва бази данних
  process.env.DB_USER, // користувач імя
  process.env.DB_PASSWORD, // пароль

  // обєкт налаштуваннь
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
