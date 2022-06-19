import { axiosInstance } from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const crearEstados = (data) => {
    return axiosInstance.post(`/estado-equipo`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const getEstadoPorId = (estadoId) => {
    return axiosInstance.get(`/estado-equipo/${estadoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editEstados = (estadoId, data) => {
    return axiosInstance.put(`/estado-equipo/${estadoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteEstado = (estadoId) => {
    return axiosInstance.delete(`/estado-equipo/${estadoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}
export {
    getEstadosEquipos, crearEstados, getEstadoPorId, editEstados, deleteEstado
}