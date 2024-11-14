import express from 'express';
import cors from 'cors';
import empleadoRoutes from './routes/empleadoRoutes.js';
import { connectToDatabase } from './config/db.js'

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

//Permitir api
app.use(cors());

// Conectar a la base de datos
connectToDatabase();

// Rutas
app.use('/api/empleados', empleadoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
