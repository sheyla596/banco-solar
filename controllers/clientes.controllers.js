import {
    agregarUsuario,
    verUsuario,
    editarUsuario,
    borrarUsuario,
  } from "../querys/consultas.querys.js";
  
  const agregarCliente = async (req, res) => {
    try {
      const { nombre, balance } = req.body;
      const datos = [nombre, balance];
      console.log(datos);
      console.log(req.body);
      await agregarUsuario(datos);
      res.send("El cliente ha sido agregado");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const verCliente = async (req, res) => {
    const response = await verUsuario(); //
    res.json(response);
  };
  
  const editarCliente = async (req, res) => {
    try {
      const { nombre, balance, id } = req.body;
      const datos = [nombre, balance, id];
      await editarUsuario(datos);
      res.send("Se han realizado los cambios correctameente");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const borrarCliente=async (req, res) => {
      try{
      const { id } = req.query;
      await borrarUsuario(id);
      res.send("El cliente ha sido eliminado correctamente");
      }
      catch(error){
          res.status(500).send('No se ha podido eliminar el cliente')
      }
    };
  
  export { agregarCliente, verCliente, editarCliente, borrarCliente};