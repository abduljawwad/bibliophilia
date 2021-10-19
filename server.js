require('./configuration/db')
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const UserRouter = require('./routes/User')

// Add express Builtin middleware
app.use(express.json());

// Add third party middleware
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

app.use('/user', UserRouter)



const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port}...`));
