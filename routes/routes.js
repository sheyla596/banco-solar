import express from "express";
const routes = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import {
  agregarCliente,
  verCliente,
  editarCliente,
  borrarCliente,
} from "../controllers/clientes.controllers.js";

import { crearTransaccion, verTransaciones } from "../controllers/operaciones.controllers.js";

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

routes.post("/usuario", agregarCliente);
routes.get("/usuarios", verCliente);
routes.put("/usuario", editarCliente);
routes.delete("/usuario", borrarCliente);
routes.post("/transferencia", crearTransaccion);
routes.get("/transferencias", verTransaciones);



export default routes;