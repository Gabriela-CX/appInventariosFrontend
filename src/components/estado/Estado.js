import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getEstadosEquipos, deleteEstado } from '../../services/estadoEquipoService';
import { Link } from 'react-router-dom';
import { EstadoPopup } from './EstadoPopup';

export const Estado = () => {

  const [estados, setEstados] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarEstados = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getEstadosEquipos();
      setEstados(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarEstados();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }
  
const handleDelete = async (estadoId) => {
  try 
  {
      await deleteEstado(estadoId);
      listarEstados();
      console.log(estadoId);    
  } catch (error) {
      console.log(error); 
  }

}

  return (
    <div className="container-fluid">
      <div class="mt-2 mb-2 ">
        <div className="col" key={estados._id}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            {
              estados.map((estado) => {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{estado.nombre}</th>
                      <td>{estado.estado}</td>
                      <td>
                        <Link to={`estados/edit/${estado._id}`}>
                          <button className="btn btn-primary edit-button">
                            <i class="fa-solid fa-pencil"></i></button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => {handleDelete(estado._id)}}><i class="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>

                )
              })
            }
          </table>
        </div>

      </div>
      {
        openModal ? <EstadoPopup
          handleOpenModal={handleOpenModal}
          listarEstados={listarEstados} /> :
          (<button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i></button>)
      }

    </div>
  )
}


