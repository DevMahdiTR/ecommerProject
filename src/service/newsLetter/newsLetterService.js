import fetch from '../../config/interceptor/interceptor'
import {BaseUrl, APIS} from "../../config/constant/URLS";

export const addNewsLetter = (data) => {
    return fetch({
        method: 'post',
        url: BaseUrl + APIS.NEWSLETTER.add,
        params: data
    })
}
