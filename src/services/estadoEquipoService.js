import {axiosInstance} from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-type':'application/json'
        }
    })
}

const crearEstados = (data) => {
    return axiosInstance.post(`/estado-equipo`, data, {
        headers: {
            'Content-type':'application/json'
        }
    });

}

//todo: crear, actualizar, listar por id

export {
    getEstadosEquipos, crearEstados
}