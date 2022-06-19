import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';
import { InventarioPopup } from './InventarioPopup';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Inventario = () => {

  const [inventarios, setInventarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarInventarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getInventarios();
      setInventarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarInventarios();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div class="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          inventarios.map((inventario) => {
            return (
              <div className="col" key={inventario._id}>
                <div className="card">
                  <img src={inventario.foto} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{inventario.serial}</h5>
                    <p className="card-text">{inventario.descripcion}</p>
                    <hr />
                    <p className="card-text">{inventario.estadoEquipo.nombre}</p>
                    <p className="card-text">
                      <Link to={`inventarios/edit/${inventario._id}`}>Ver mas...</Link>
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        openModal ? <InventarioPopup
          handleOpenModal={handleOpenModal}
          listarInventarios={listarInventarios} /> :
          (<button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i></button>)
      }


    </div>

  )
}
