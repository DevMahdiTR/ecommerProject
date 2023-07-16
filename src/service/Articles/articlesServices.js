import {APIS, BaseUrl} from "../../config/constant/URLS";
import fetch from '../../config/interceptor/interceptor'

export const getArticles = () => {
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
export const getArticleById = (id)=>{
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.ARTICLES.getById(id),
    })
}

export const getArticlesPublic = () => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.PUBLIC.articlesList
    })
}

export const getArticlesDetails = (id) => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.PUBLIC.articlesDetails(id)
    })
}

export const getNewestArticles = (limit) => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.PUBLIC.newestArticles(limit)
    })
}
export const getArticlesBuCategories = (id) => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.PUBLIC.articlesByCategories(id)
    })
}
