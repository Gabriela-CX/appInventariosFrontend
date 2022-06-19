import {axiosInstance} from '../helpers/axios-config';

const getTiposEquipo = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type':'application/json'
        }
    })
}

const crearTiposEquipo = (data) => {
    return axiosInstance.post(`/tipo-equipo`, data, {
        headers: {
            'Content-type':'application/json'
        }
    });

}

const getTipoPorId = (tipoId) => {
    return axiosInstance.get(`/tipo-equipo/${tipoId}`, {
        headers: {
            'Content-type':'application/json'
        }
    });

}

const editTipos = (tipoId, data) => {
    return axiosInstance.put(`/tipo-equipo/${tipoId}`, data, {
        headers: {
            'Content-type':'application/json'
        }
    });
}

const deleteTipo = (tipoId) => {
    return axiosInstance.delete(`/tipo-equipo/${tipoId}`, {
        headers: {
            'Content-type':'application/json'
        }
    });
    }

export {
    getTiposEquipo, crearTiposEquipo, getTipoPorId, editTipos, deleteTipo
}