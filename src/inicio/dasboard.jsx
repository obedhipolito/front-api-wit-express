import React, { useEffect, useState } from 'react';
import '../inicio/App.css';

import fetchData from '../conexion/conexion';

function Inicio() {
    
    var [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [developers, setDevelopers] = useState([]);
    const [newDeveloper, setNewDeveloper] = useState({
        nombre: '',
        edad: '',
        habilidades: ''
    });

    const fillFormForEdit = async (id) => {
        try {
            const devToEdit = developers.find(dev => dev.id === id);
            if (devToEdit) {
                setSelectedDeveloper(devToEdit);
                setNewDeveloper(devToEdit);
            } else {
                console.error(`No se encontró ningún desarrollador con el ID ${id}`);
            }
        } catch (error) {
            console.error('Error filling form for edit:', error);
        }
    };
    

    const guardarDesarrollador = async () => {
        try {
            if (selectedDeveloper && selectedDeveloper.id) {
                await updateDeveloper(selectedDeveloper.id, newDeveloper);
            } else {
                await createDeveloper();
            }
            fetchAllDevelopers();
        } catch (error) {
            console.error('Error al guardar el desarrollador:', error);
        }
    };

    useEffect(() => {
        fetchAllDevelopers();
    }, []);

    const fetchAllDevelopers = async () => {
        try {
            const developersData = await fetchData('GET'); // Para obtener todos los desarrolladores
            setDevelopers(developersData);
        } catch (error) {
            console.error('Error fetching developers data:', error);
        }
    };
    
    const fetchDeveloperById = async (id) => {
        try {
            const developerData = await fetchData('GET', id); // Para obtener un desarrollador por su ID
            // Procesar la respuesta y actualizar el estado según sea necesario
        } catch (error) {
            console.error('Error fetching developer data:', error);
        }
    };
    
    const createDeveloper = async () => {
        try {
            const createdDeveloperData = await fetchData('POST', newDeveloper);
        } catch (error) {
            console.error('Error creating developer:', error);
        }
    };
    
    const updateDeveloper = async (id, updatedDeveloper) => {
        try {
            await fetchData('PUT', updatedDeveloper, id);
        } catch (error) {
            console.error('Error updating developer:', error);
        }
    };
    
    const deleteDeveloper = async (id) => {
        try {
            await fetchData('DELETE',null, id);
            const updatedDevelopers = developers.filter(dev => dev.id !== id);
            setDevelopers(updatedDevelopers);
        } catch (error) {
            console.error('Error deleting developer:', error);
        }
    };

    const InputChange = (e) => {
        setNewDeveloper({...newDeveloper, [e.target.name]: e.target.value});
    };

      return (
        <div className='main-background'>
          <div className='second-backgroud'>
            <div className='container'>
              <div className='container-add'>
                <h2>Datos</h2>
                <table>
                  <tbody>
                    <tr>
                      <td><input type="text" id="name" name="nombre" value={newDeveloper.nombre} onChange={InputChange} placeholder='Nombre'/></td>
                    </tr>
                    <tr>
                      <td><input type="text" id="age" name="edad" value={newDeveloper.edad} onChange={InputChange} placeholder='Edad'/></td>
                    </tr>
                    <tr>
                      <td><input type="text" id="skills" name="habilidades" value={newDeveloper.habilidades} onChange={InputChange} placeholder='Habilidades'/></td>
                    </tr>
                    <tr>
                    <button className='Btn-add' onClick={guardarDesarrollador}>Guardar</button>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='table-container'>
                <h2>Lista de Desarrolladores</h2>
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Habilidades</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {developers.map((developer, index) => (
                      <tr key={developer.id}>
                        <td>{index + 1}</td>
                        <td>{developer.nombre}</td>
                        <td>{developer.edad}</td>
                        <td>{developer.habilidades}</td>
                        <td>
                        <button onClick={() => fillFormForEdit(developer.id)}>Editar</button>
                          <button onClick={() => deleteDeveloper(developer.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Inicio;