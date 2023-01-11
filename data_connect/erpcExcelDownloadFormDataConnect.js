import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const erpcExcelDownloadFormDataConnect = () => {
    return {
        searchList: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erpc-excel-download-forms`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        create: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erpc-excel-download-forms`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
    }
}

export {
    erpcExcelDownloadFormDataConnect
}