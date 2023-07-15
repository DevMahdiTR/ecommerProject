import fetch from '../../config/interceptor/interceptor'
import { BaseUrl, APIS} from "../../config/constant/URLS";


export const addOrUpdate = (data) => {
    return fetch({
        method: "post",
        url: BaseUrl + APIS.BANNERS.addOrUpdate,
        data
    })
}

export const getBanners = () => {
    return fetch({
        method: "get",
        url: BaseUrl + APIS.PUBLIC.banners
    })
}

