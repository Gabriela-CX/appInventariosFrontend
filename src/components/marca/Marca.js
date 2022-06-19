import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getMarcas } from '../../services/marcaService';
import { Link } from 'react-router-dom';
import { MarcaPopup } from './MarcaPopup';

export const Marca = () => {

  const [marcas, setMarcas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMarcas();
      setMarcas(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarMarcas();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div class="mt-2 mb-2 ">
        <div className="col" key={marcas._id}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            
              {
                marcas.map((marca) => {
                  return (
                    <tbody>
                    <tr>
                      <th scope="row">{marca.nombre}</th>
                      <td>{marca.estado}</td>
                      <td>
                        <button className="btn btn-primary edit-button">
                          <Link to={`marcas/edit/${marca._id}`}></Link>
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
        {
          openModal ? <MarcaPopup
          handleOpenModal={handleOpenModal}
          listarUsuarios={listarMarcas} /> :
          (<button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i></button>)
      }

      </div>
      
    </div>
  )
}

