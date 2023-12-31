import fetch from '../../config/interceptor/interceptor'
import { BaseUrl, APIS} from "../../config/constant/URLS";


export const addPromotion = (data) => {
    return fetch({
        method: "post",
        url: BaseUrl + APIS.PROMOTIONS.add,
        data
    })
}

export const deactivatePromotion = (id, data) => {
    return fetch({
        method: "post",
        url: BaseUrl + APIS.PROMOTIONS.deactivate(id),
        data
    })
}

export const deletePromotion = (id) => {
    return fetch({
        method: "delete",
        url: BaseUrl + APIS.PROMOTIONS.delete(id)
    })
}

export const getPromotions = () => {
    return fetch({
        method: "get",
        url: BaseUrl + APIS.PUBLIC
    })
}
