const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
// Connect Database
connectDB.Get();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/data"));
app.use("/api/handle", require("./routes/handle"));
app.use("/api/device", require("./routes/device"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
