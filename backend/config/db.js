import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://first-db:12345@firstcloudmd.khllr46.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsInsecure=true";
const client = new MongoClient(uri);
let empleadosCollection;

export async function connectToDatabase() {
  try {
      const database = client.db('hr'); // Reemplaza con tu base de datos
      await client.connect();
    empleadosCollection = database.collection('empleados');
    console.log('Conectado exitosamente a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

export function getEmpleadosCollection() {
  return empleadosCollection;
}
