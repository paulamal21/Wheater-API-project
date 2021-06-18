const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const indexRouter = require('./routes/indexRouter'); 
const weatherRouter = require('./routes/weatherRouter'); 
const errRouter = require('./routes/errRouter'); 

const getWeather = require("./lib/getWeather");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use('/', indexRouter); 
app.use('/weather', weatherRouter); 
app.use('*', errRouter); 

app.get("/", async (req, res) => {
  let data = await getWeather();
  let name = data.name;
  let temp = data.main.temp;
  res.render("index", { name, temp });
});

app.get("/weather", (req, res) => {
  res.render("weather");
});


app.post("/weather", async (req, res) => {
  let location = req.body.location;
  let countryCode = req.body.countryCode;
  let data = await getWeather(location, countryCode);
  if (data.cod == "404") {
    res.render("weather", {
      err: "The provided location doesn't exist",
    });
    return;
  }
  let name = data.name;
  let description = data.weather[0].description;
  let temp = data.main.temp;
  let feels_like = data.main.feels_like;
  res.render("weather", {
    name,
    data: { description, temp, feels_like },
    displayWeather: true,
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(process.env.port || 5000, () => {
  console.log("App is online");
});
