import { useEffect, useState } from 'preact/hooks';
import { createEmpleado, getEmpleados, updateEmpleado, deleteEmpleado } from './services/empleadosService';

const EmpleadoCrud = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', edad: '', puesto: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null); // Nuevo estado para almacenar el ID del empleado

  // Obtener empleados al cargar el componente
  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const data = await getEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.edad || !formData.puesto) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        // Si estamos en modo edición, actualizamos el empleado
        if (currentId) {
          await updateEmpleado(currentId, formData);
          alert('Empleado actualizado');
        }
      } else {
        // Si no estamos en modo edición, creamos un nuevo empleado
        await createEmpleado(formData);
        alert('Empleado creado');
      }

      fetchEmpleados(); // Actualizar lista de empleados
      setFormData({ nombre: '', edad: '', puesto: '' }); // Limpiar formulario
      setIsEditMode(false); // Volver al estado de creación
      setCurrentId(null); // Limpiar el ID
    } catch (error) {
      console.error(isEditMode ? 'Error al actualizar el empleado' : 'Error al crear el empleado:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (empleado: { _id: string; nombre: string; edad: number; puesto: string }) => {
    setFormData({ nombre: empleado.nombre, edad: empleado.edad, puesto: empleado.puesto });
    setIsEditMode(true); // Cambiar a modo de edición
    setCurrentId(empleado._id); // Guardar el ID del empleado (cambiar de id a _id)
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este empleado?');
    if (confirmed) {
      try {
        await deleteEmpleado(id); // Asegúrate de que id esté en formato de cadena
        fetchEmpleados(); // Actualizar lista de empleados
        alert('Empleado eliminado');
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
      }
    }
  };

  const handleSearch = (e: Event) => {
    const searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
    setSearchTerm(searchQuery);
  };

  // Filtrar empleados según el término de búsqueda
  const filteredEmpleados = empleados.filter((empleado: { nombre: string; edad: number; puesto: string }) =>
    empleado.nombre.toLowerCase().includes(searchTerm)
  );

  return (
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mb-8 text-blue-600">{isEditMode ? 'Editar' : 'Crear'} Empleado</h1>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} class="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label class="block text-gray-700 font-medium">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onInput={(e: any) => setFormData({ ...formData, nombre: e.target.value })}
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el nombre del empleado"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Edad</label>
          <input
            type="number"
            value={formData.edad}
            onInput={(e: any) => setFormData({ ...formData, edad: e.target.value })}
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese la edad del empleado"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Puesto</label>
          <input
            type="text"
            value={formData.puesto}
            onInput={(e: any) => setFormData({ ...formData, puesto: e.target.value })}
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingrese el puesto del empleado"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          class="mt-4 w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? (isEditMode ? 'Actualizando...' : 'Creando...') : (isEditMode ? 'Actualizar Empleado' : 'Crear Empleado')}
        </button>
      </form>

      {/* Búsqueda */}
      <div class="mt-6">
        <input
          type="text"
          placeholder="Buscar empleado..."
          onInput={handleSearch}
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista de empleados */}
      <ul class="mt-6 space-y-4">
        {filteredEmpleados.map((empleado: { _id: string; nombre: string; edad: number; puesto: string }) => (
          <li key={empleado._id} class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <div>
              <h3 class="text-lg font-bold">{empleado.nombre}</h3>
              <p>{empleado.puesto} - {empleado.edad} años</p>
            </div>
            <div>
              <button
                onClick={() => handleUpdate(empleado)}
                class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(empleado._id)} // Cambiar id a _id
                class="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpleadoCrud;
