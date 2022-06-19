import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUsuarios } from '../../services/usuarioService';
import { Link } from 'react-router-dom';
import { UsuarioPopup } from './UsuarioPopup';

export const Usuario = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getUsuarios();
      setUsuarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarUsuarios();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div class="mt-2 mb-2 ">
        <div className="col" key={usuarios._id}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            
              {
                usuarios.map((usuario) => {
                  return (
                    <tbody>
                    <tr>
                      <th scope="row">{usuario.nombre}</th>
                      <td>{usuario.email}</td>
                      <td>{usuario.estado}</td>
                      <td>
                        <button className="btn btn-primary edit-button">
                          <Link to={`usuarios/edit/${usuario._id}`}></Link>
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
          openModal ? <UsuarioPopup
          handleOpenModal={handleOpenModal}
          listarUsuarios={listarUsuarios} /> :
          (<button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fa-solid fa-plus"></i></button>)
      }
    </div>
  )
}
