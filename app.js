require("dotenv").config();
const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(Express.static(__dirname + "/public")); //Para decirle donde van los estáticos
app.set("views", __dirname + "/views"); // Para decirle donde van las listas
app.set("view engine", "hbs"); //Para decirle que el hbs es el que renderiza las vistas

app.use(
  session({
    secret: "basic-auth",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes"));

app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/userAccess", require("./routes/userAccess"));
app.use("/adminAccess", require("./routes/adminAccess"));
app.use("/beers", require("./routes/beers"));

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/app`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to mongo on port ${DB_PORT}`))
  .catch(err => {
    throw err;
  });

app.use((req, res) => res.status(404).json({ message: "route not found" }));

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} `);
});
