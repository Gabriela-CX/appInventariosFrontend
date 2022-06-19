import React, { useState, } from 'react';
import {crearUsuarios} from '../../services/usuarioService';
import Swal from 'sweetalert2';

export const UsuarioPopup = ({handleOpenModal, listarUsuarios}) => {

    const [valoresForm, setValoresForm] = useState([]);
    const { nombre = "", email = "", estado = "", fechaCreacion = "", fechaActualizacion = "" } = valoresForm;


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre, email, estado, fechaCreacion, fechaActualizacion
        }
        
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await crearUsuarios(usuario);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarUsuarios();
        
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='sidebar-header'>
                        <h3>Nuevo Usuario</h3>
                        <i class="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
                <div>
                    <div className='row'>
                        <div className='col'>
                            <hr />
                        </div>
                    </div>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col'>
                                <div class="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" value={nombre} onChange={(e) => handleOnChange(e)} className="form-control" required />
                                </div>
                            </div>
                            <div className='col'>
                                <div class="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e) => handleOnChange(e)} className="form-control" required />
                                </div>
                            </div>
                            <div className='col'>
                                <div class="mb-3">
                                    <label className="form-label">Estado</label>
                                    <input type="text" name="estado" value={estado} onChange={(e) => handleOnChange(e)} className="form-control" required />
                                </div>
                            </div>
                            <div className='col'>
                                <div class="mb-3">
                                    <label className="form-label">Fecha Creacion</label>
                                    <input type="date" name="fechaCreacion" value={fechaCreacion} onChange={(e) => handleOnChange(e)} className="form-control" required />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Fecha Actualizacion</label>
                                    <input type="date" name="fechaActualizacion" value={fechaActualizacion} onChange={(e) => handleOnChange(e)} className="form-control" required />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <button className='btn btn-primary'>Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

