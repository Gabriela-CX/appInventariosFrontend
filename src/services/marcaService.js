import {axiosInstance} from '../helpers/axios-config';

const getMarcas = () => {
    return axiosInstance.get('/marca', {
        headers: {
            'Content-type':'application/json'
        }
    })
}

const crearMarcas = (data) => {
    return axiosInstance.post(`/marca`, data, {
        headers: {
            'Content-type':'application/json'
        }
    });

}

const getMarcasPorId = (marcaId) => {
    return axiosInstance.get(`/marca/${marcaId}`, {
        headers: {
            'Content-type':'application/json'
        }
    });

}

const editMarcas = (marcaId, data) => {
    return axiosInstance.put(`/marca/${marcaId}`, data, {
        headers: {
            'Content-type':'application/json'
        }
    });
}

const deleteMarca = (marcaId) => {
    return axiosInstance.delete(`/marca/${marcaId}`, {
        headers: {
            'Content-type':'application/json'
        }
    });
    }

export {
    getMarcas, crearMarcas, getMarcasPorId, editMarcas, deleteMarca
}