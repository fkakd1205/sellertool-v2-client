import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderHeaderSocket = () => {
    return {
        createOne: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            return await axios.put(`${API_SERVER_ADDRESS}/ws/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderHeaderSocket
}