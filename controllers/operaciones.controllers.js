import { transferir, verTransferencias} from "../querys/consultas.querys.js";

const crearTransaccion= async(req,res)=>{
    try {
        const { emisor, receptor, monto } = req.body;
        const datos = [emisor, receptor, monto];
        console.log(datos);
        console.log(req.body);
        const result= await transferir(datos);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

const verTransaciones=async(req,res)=>{
try{
    const resp= await verTransferencias(); 
    res.json(resp);

}catch (error){
    res.status(500).send(error.message);
}
}

export { crearTransaccion, verTransaciones }