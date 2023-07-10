import {APIS, BaseUrl} from "../../config/constant/URLS";
import fetch from '../../config/interceptor/interceptor'

export const getArticles = ()=>{
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.ARTICLES.getArticle,
    })
}
export const AddArticles = (data)=>{
    return fetch({
        method: "post",
        url: BaseUrl+ APIS.ARTICLES.addPhotos,
        data
    })
}
export const AddArticles = (id)=>{
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.ARTICLES.getById(id),
        data
    })
}
