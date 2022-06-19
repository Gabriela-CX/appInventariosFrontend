import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getTipoPorId, editTipos } from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';

export const TipoEquipoUpdate = () => {
    const { tipoId = '' } = useParams();

    const [tipos, setTipos] = useState([]);

    const [valoresForm, setValoresForm] = useState({});
    const { nombre = "", estado = "" } = valoresForm;


    useEffect(() => {
        setValoresForm({
            nombre: tipos.nombre,
            estado: tipos.estado

        });
    }, [tipos]);

    const getTiposEquipo = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getTipoPorId(tipoId);
            setTipos(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getTiposEquipo();
    }, [tipoId]);


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const tipo = {
            nombre, estado

        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editTipos(tipoId, tipo);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrio un error, por favor intente de nuevo', 'error');
        }
    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }



    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Editar Tipo Equipo</h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-md-8">
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className="row">
                                    <div className="col">
                                        <div className='mb-3'>
                                            <label className="forma-label">Nombre</label>
                                            <input type="text" name='nombre'
                                                required
                                                value={nombre}
                                                onChange={(e) => handleOnChange(e)}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='mb-3'>
                                            <label className="forma-label">Estado</label>
                                            <input type="text" name='estado'
                                                required
                                                value={estado}
                                                onChange={(e) => handleOnChange(e)}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <button className='btn btn-primary'>Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
