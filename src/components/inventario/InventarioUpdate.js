import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipo } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';
import { getInventariosPorId, editInventarios } from '../../services/inventarioService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {
  const { inventarioId = '' } = useParams();
  const [inventario, setInventario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valoresForm, setValoresForm] = useState([]);
  const { serial = "", modelo = "", descripcion = "", color = "", foto = "", fechaCompra = "", precio = "", usuario, marca, tipo, estado } = valoresForm;


  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const { data } = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarUsuarios();
  }, []);

  useEffect(() => {
    const listarMarcas = async () => {
      try {
        const { data } = await getMarcas();
        setMarcas(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarMarcas();
  }, []);

  useEffect(() => {
    setValoresForm({
      serial: inventario.serial,
      modelo: inventario.modelo,
      descripcion: inventario.descripcion,
      color: inventario.color,
      foto: inventario.foto,
      fechaCompra: inventario.fechaCompra,
      precio: inventario.precio,
      usuario: inventario.usuario,
      marca: inventario.marca,
      tipo: inventario.tipoEquipo,
      estado: inventario.estadoEquipo
    })
  }, [inventario]);

  useEffect(() => {
    const listarEquipos = async () => {
      try {
        const { data } = await getTiposEquipo();
        setTipos(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarEquipos();
  }, []);

  useEffect(() => {
    const listarEstados = async () => {
      try {
        const { data } = await getEstadosEquipos();
        setEstados(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarEstados();
  }, []);

  const getInventario = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getInventariosPorId(inventarioId);
      setInventario(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    getInventario();
  }, [inventarioId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventario = {
      serial, modelo, descripcion, color, foto, fechaCompra, precio, usuario: { _id: usuario },
      marca: { _id: marca }, tipoEquipo: { _id: tipo }, estadoEquipo: { _id: estado }
    }
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await editInventarios(inventarioId, inventario);
            console.log(data);
            Swal.close();
        }catch(error){
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data){
              mensaje = error.response.data;
            } else {
              mensaje = 'Ocurrio un error, por favor intente de nuevo';
            }
            Swal.fire('Error', mensaje, 'error');
        }
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Detalle activo</h3>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4 image-container'>
              <img src={inventario?.foto} />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                  <div className='col'>
                    <div class="mb-3">
                      <label className="form-label">Serial</label>
                      <input type="text" name="serial" value={serial} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div class="mb-3">
                      <label className="form-label">Modelo</label>
                      <input type="text" name="modelo" value={modelo} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div class="mb-3">
                      <label className="form-label">Descripcion</label>
                      <input type="text" name="descripcion" value={descripcion} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div class="mb-3">
                      <label className="form-label">Color</label>
                      <input type="text" name="color" value={color} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Foto</label>
                      <input type="url" name="foto" value={foto} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div class="mb-3">
                      <label className="form-label">Fecha compra</label>
                      <input type="date" name="fechaCompra" value={fechaCompra} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input type="number" name="precio" value={precio} onChange={(e) => handleOnChange(e)} className="form-control" required />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Usuario</label>
                      <select className="form-select" onChange={(e) => handleOnChange(e)} name='usuario' value={usuario} required>
                        <option value="">--SELECCIONAR--</option>
                        {
                          usuarios.map(usuario => {
                            return <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <select className="form-select" onChange={(e) => handleOnChange(e)} name='marca' value={marca} required>
                        <option value="">--SELECCIONAR--</option>
                        {
                          marcas.map(marcas => {
                            return <option key={marcas._id} value={marcas._id}>{marcas.nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo Equipo</label>
                      <select className="form-select" onChange={(e) => handleOnChange(e)} name='tipo' value={tipo} required>
                        <option value="">--SELECCIONAR--</option>
                        {
                          tipos.map(tipos => {
                            return <option key={tipos._id} value={tipos._id}>{tipos.nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Estado Equipo</label>
                      <select className="form-select" onChange={(e) => handleOnChange(e)} name='estado' value={estado} required>
                        <option value="">--SELECCIONAR--</option>
                        {
                          estados.map(estados => {
                            return <option key={estados._id} value={estados._id}>{estados.nombre}</option>
                          })
                        }
                      </select>
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
      </div>
    </div>
  )
}
