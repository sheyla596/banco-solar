import { text } from "express";
import pool from "../config/db.js";

//Consulta para ingresar datos usuarios
const agregarUsuario = async (datos) => {
  try {
    const query = {
      text: "insert into usuarios(nombre,balance)values($1,$2) returning *",
      values: datos,
    };
    const resp = await pool.query(query);
    return resp.rows[0];
  } catch (error) {
    console.log(error.message);
  }
};

//consulta de obtener datos usuarios
const verUsuario = async () => {
  try {
    const query = {
      text: "select * from usuarios",
    };
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const editarUsuario = async (datos) => {
  try {
    const query = {
      text: "update usuarios set nombre=$1, balance=$2 where id=$3 returning *",
      values: datos,
    };
    const resp = await pool.query(query);
    return resp.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const borrarUsuario = async (id) => {
  const deleteUser = {
    text: "delete from usuarios where id=$1",
    values: [id],
  };
  const deleteTransfer = {
    text: "DELETE FROM transferencias WHERE emisor = $1 OR receptor = $1;",
    values: [id],
  };
  try {
    await pool.query("begin");
    await pool.query(deleteTransfer);
    const response=await pool.query(deleteUser);
    await pool.query("commit");
    if (response.rowCount == 0) {
      throw new Error("Usuario eliminado");
    }
    return response.rows;
  } catch (error) {
    console.log(error.message);
  }
};

//consulta transsacciones bancarias
const transferir = async (datos) => {
    const [emisor, receptor, monto] = datos;
    const { id: emisorId } = (
      await pool.query(`select * from usuarios where nombre='${emisor}'`)
    ).rows[0];
    const { id: receptorId } = (
      await pool.query(`select * from usuarios where nombre='${receptor}'`)
    ).rows[0];
    const addTransferencia = {
      text: "insert into transferencias(emisor,receptor,monto,fecha) values ($1,$2,$3,now()) returning *",
      values: [emisorId, receptorId, monto],
    };
    const actualizarEmisor = {
      text: "update usuarios set balance= balance - $1 where nombre=$2 returning *",
      values: [monto, emisor],
    };
    const actualizarReceptor = {
      text: "update usuarios set balance= balance + $1 where nombre=$2 returning *",
      values: [monto, receptor],
    };
    try {
      await pool.query("begin");
  
      await pool.query(actualizarEmisor);
  
      await pool.query(actualizarReceptor);
  
      const result = await pool.query(addTransferencia);
  
      await pool.query("commit");
  
      console.log("Transacción Realizada con exito");
      console.log(result.rows);
      return true;
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const verTransferencias = async () => {
    try {
      const sql = {
        text:`SELECT
        t.fecha,
        e.nombre AS emisor,
        r.nombre AS receptor,
        t.monto
        FROM
        transferencias t
        JOIN
        usuarios e ON t.emisor = e.id
        JOIN
        usuarios r ON t.receptor = r.id;`,
        rowMode:"array"
      };
      const resp = await pool.query(sql);
      console.log(resp.rows);
      return resp.rows;
    } catch (error) {
      console.log(error.message);
    }
  };

export { agregarUsuario, verUsuario, editarUsuario, borrarUsuario, transferir, verTransferencias };