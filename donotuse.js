const express = require("express");
const app = express();
const validate = require("express-jsonschema").validate;
const helmet = require("helmet");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const booksSchema = require("./schemas/books.json");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const books = require("./routes/books")
const home = require("./routes/home")

// Add express Builtin middleware
app.use(express.json());

// Add third party middleware
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

// Add custom middleware
app.use(logger);
app.use(authenticator);

// Add routes
app.use('/api', validate({ body: booksSchema }), home)

// app.post("/api", validate({ body: booksSchema }), (req, res) => {
//   res.send(req.body);
// });



const port = process.env.PORT || 3039;
app.listen(port, () => console.log(`Listening on port ${port}...`));
