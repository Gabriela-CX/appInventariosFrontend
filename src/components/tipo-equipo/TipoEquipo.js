import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { deleteTipo, getTiposEquipo } from '../../services/tipoEquipoService';
import { Link } from 'react-router-dom';
import { TipoEstadoPopup } from './TipoEquipoPopup';

export const TipoEquipo = () => {

  const [tipos, setTipos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getTiposEquipo();
      setTipos(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  const handleDelete = async (tipoId) => {
    try 
    {
        await deleteTipo(tipoId);
        getTiposEquipo();
        console.log(tipoId);    
    } catch (error) {
        console.log(error); 
    }

  }

  return (
    <div className="container-fluid">
      <div class="mt-2 mb-2 ">
        <div className="col" key={tipos._id}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            {
              tipos.map((tipo) => {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{tipo.nombre}</th>
                      <td>{tipo.estado}</td>
                      <td>
                        <Link to={`tipos/edit/${tipo._id}`}>
                          <button className="btn btn-primary edit-button">
                            <i class="fa-solid fa-pencil"></i></button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => {handleDelete(tipo._id)}}><i class="fa-solid fa-trash"></i></button>
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
        openModal ? <TipoEstadoPopup
          handleOpenModal={handleOpenModal}
          listarUsuarios={listarTipos} /> :
          (<button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i></button>)
      }

    </div>
  )
}