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
//todo: crear, actualizar, listar por id

export {
    getMarcas, crearMarcas
}