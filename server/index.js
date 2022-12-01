require("dotenv").config(); // для звернення до зовнішнього оточення;
const express = require("express");
const sequelize = require("./db"); // для звязування з базою данних;
const models = require("./models/models"); // моделі бази данних;
const PORT = process.env.PORT || 4000; // звернення до порта через зовнішне оточення;
const cors = require("cors"); //щоб відправляти запроси з браузера;
const fileUpload = require("express-fileupload"); // пакет для файлів(фотографій);
const router = require("./routes/index"); //головний роутер;
const errorHandler = require("./middleware/ErrorHandlingMiddleware"); //мідервара обробки помилки;
const path = require("path");

const app = express();
app.use(cors()); //виклик корса() для запитів;
app.use(express.json()); // щоб парсити джесон формат;
app.use(express.static(path.resolve(__dirname, "static"))); // файли з папки static роздавати статично;

app.use(fileUpload({})); // викликаємо з пустим обєктом для файлів;
app.use("/api", router); // виклик головного роутера;

// міделвара яка працює з помилками повинна бути останньою;
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // підключення до бази данних;
    await sequelize.sync(); // звіряє стан бази данних зі схемою данних;

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
