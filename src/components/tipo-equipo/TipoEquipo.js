import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getTiposEquipo } from '../../services/tipoEquipoService';
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
                        <button className="btn btn-primary edit-button">
                          <Link to={`tipos/edit/${tipo._id}`}></Link>
                          <i class="fa-solid fa-pencil"></i></button>
                        <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
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