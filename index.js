const express = require("express");
const routerApi = require('./routes');
const app = express();
const port = 3000;

// middleware que sirve para admitir data de tipo JSON
app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/nueva-ruta", (req, res) =>{
  res.send("Hola soy un nuevo end point");
});

routerApi(app);

app.listen(port, () =>{
  console.log("My port: " + port);
});
