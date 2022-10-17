import axios from 'axios';

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress

const productOptionDataConnect = () => {
    return {
        getList: async function () {
            return await axios.get(`${API_ADDRESS}/api/v1/product-option/list`, {
                withCredentials: true
            })
        },
        searchOptionListByProduct: async function (productCid) {
            return await axios.get(`${API_ADDRESS}/api/v1/product-option/list/${productCid}`, {
                withCredentials: true
            })
        },
        postOne: async function(productOption){
            return await axios.post(`${API_ADDRESS}/api/v1/product-option/one`, productOption,{
                withCredentials: true
            })
        },
        postOptionAndPackages: async function(productOption){
            let optionDto = {
                id: productOption.id,
                code: productOption.code,
                defaultName: productOption.defaultName,
                managementName: productOption.managementName,
                salesPrice: productOption.salesPrice,
                totalPurchasePrice: productOption.totalPurchasePrice,
                stockUnit: productOption.stockUnit,
                status: productOption.status,
                memo: productOption.memo,
                imageUrl: productOption.imageUrl,
                imageFileName: productOption.imageFileName,
                color: productOption.color,
                unitCny: productOption.unitCny,
                unitKrw: productOption.unitKrw,
                totalPurchasePrice: productOption.totalPurchasePrice,
                packageYn: productOption.packageYn,
                productCid: productOption.productCid,
                productId: productOption.productId
            }
            let packageDtos = productOption.optionPackages ?? [];

            let json = {
                optionDto: optionDto,
                packageDtos: packageDtos
            }
            return await axios.post(`${API_ADDRESS}/api/v1/product-option/option-packages`, json, {
                withCredentials: true
            })
        },
        putOne: async function (productOption) {
            return await axios.put(`${API_ADDRESS}/api/v1/product-option/one`, productOption, {
                withCredentials: true
            })
        },
        putOptionAndPackages: async function (productOption) {
            let optionDto = {
                cid: productOption.cid,
                id: productOption.id,
                code: productOption.code,
                defaultName: productOption.defaultName,
                managementName: productOption.managementName,
                salesPrice: productOption.salesPrice,
                totalPurchasePrice: productOption.totalPurchasePrice,
                stockUnit: productOption.stockUnit,
                status: productOption.status,
                memo: productOption.memo,
                imageUrl: productOption.imageUrl,
                imageFileName: productOption.imageFileName,
                color: productOption.color,
                unitCny: productOption.unitCny,
                unitKrw: productOption.unitKrw,
                totalPurchasePrice: productOption.totalPurchasePrice,
                packageYn: productOption.packageYn,
                productCid: productOption.productCid,
                productId: productOption.productId
            }
            let packageDtos = productOption.optionPackages ?? [];

            let json = {
                optionDto: optionDto,
                packageDtos: packageDtos
            }

            return await axios.put(`${API_ADDRESS}/api/v1/product-option/option-packages`, json, {
                withCredentials: true
            })
        },
        deleteOne: async function(optionCid){
            return await axios.delete(`${API_ADDRESS}/api/v1/product-option/one/${optionCid}`,{
                withCredentials: true
            })
        },
        searchStockStatus: async function(optionCid) {
            return await axios.get(`${API_ADDRESS}/api/v1/product-option/stock/status/${optionCid}`, {
                withCredentials: true
            })
        },
        searchAllStockStatus: async function() {
            return await axios.get(`${API_ADDRESS}/api/v1/product-option/stock/statusList`, {
                withCredentials: true
            })
        },
        searchListStockStatus: async function(startDate, endDate) {
            return await axios.get(`${API_ADDRESS}/api/v1/product-option/stock/status`, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                },
                withCredentials: true
            })
        },
        searchList: async function () {
            return await axios.get(`http://localhost:8081/api/v1/product-option/list-m2oj`, {
                withCredentials: true
            })
        }
    }
}

export {
    productOptionDataConnect
}