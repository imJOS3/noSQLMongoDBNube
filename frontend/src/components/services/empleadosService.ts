const API_URL = 'http://localhost:3000/api/empleados';

// Crear un nuevo empleado
export const createEmpleado = async (empleado: { nombre: string; edad: number; puesto: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empleado),
  });

  if (!response.ok) {
    throw new Error('Error al crear el empleado');
  }
};

// Obtener todos los empleados
export const getEmpleados = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los empleados');
  }
  const data = await response.json();
  return data;
}

// Actualizar un empleado
export const updateEmpleado = async (id: string, empleado: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(empleado),
  });
  
  if (!response.ok) {
    throw new Error('Error al actualizar el empleado');
  }

  return await response.json();
};

// Eliminar un empleado
export const deleteEmpleado = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el empleado');
  }

  return await response.json();
};
