const express = require("express");
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

// middleware que sirve para admitir data de tipo JSON
app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/nueva-ruta", (req, res) =>{
  res.send("Hola soy un nuevo end point");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () =>{
  console.log("My port: " + port);
});
