import pkg from 'pg';
const {Pool} = pkg 
process.loadEnvFile();
 
const {DB_HOST, DB_PASSWORD, DB_DATABASE, DB_USER, DB_PORT} = process.env;

const pool = new Pool({
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
  })

export default pool