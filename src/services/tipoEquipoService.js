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

//todo: crear, actualizar, listar por id

export {
    getTiposEquipo, crearTiposEquipo
}