const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");

const route = require("./routes");
const db = require("./configs/db.config");
// Config dotenv
dotenv.config();
// Connect to the database
db.connectDatabase();

const app = express();
const port = process.env.PORT || 5000;
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(cors());
app.use(express.json()); // gửi từ code javascript
app.use(helmet()); // helper để bảo vệ server
app.use(express.static(path.join(__dirname, "public"))); // Cấp quyền cho phép người dùng có thể xem được những thứ trong folder public
app.use(bodyParser.urlencoded({ extended: true })); // gửi từ code html
app.use(morgan("dev"));
//Routes init
route(app);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
