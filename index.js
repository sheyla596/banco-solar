import express from "express";
const app=express();
const port = 3000;
import routes from "./routes/routes.js";

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${port}`);
  });

//Midleware
app.use(express.json());
app.use(express.static('assets'));
app.use("/",routes);

