import { getEmpleadosCollection } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Crear empleado
export async function crearEmpleado(req, res) {
  const nuevoEmpleado = req.body;
  try {
    const resultado = await getEmpleadosCollection().insertOne(nuevoEmpleado);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleado' });
  }
}

// Obtener todos los empleados
export async function obtenerEmpleados(req, res) {
  try {
    const empleados = await getEmpleadosCollection().find().toArray();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
}

// Obtener empleado por ID
export async function obtenerEmpleadoPorId(req, res) {
  const { id } = req.params;
  try {
    const empleado = await getEmpleadosCollection().findOne({ _id: new ObjectId(id) });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
}

// Actualizar empleado
export async function actualizarEmpleado(req, res) {
  const { id } = req.params;
  const actualizacion = req.body;
  try {
    const resultado = await getEmpleadosCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: actualizacion }
    );
    if (resultado.matchedCount === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
}

// Eliminar empleado
export async function eliminarEmpleado(req, res) {
  const { id } = req.params;
  try {
    const resultado = await getEmpleadosCollection().deleteOne({ _id: new ObjectId(id) });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
}
