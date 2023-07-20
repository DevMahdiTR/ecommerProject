import {APIS, BaseUrl} from "../../config/constant/URLS";
import fetch from '../../config/interceptor/interceptor'


export const getAllReviews = () => {
    return fetch({
        method: "get",
        url: BaseUrl+ APIS.REVIEWS.getAllReviews,
    })
}
export const addReview = (data) => {
    return fetch({
        method: "post",
        url: BaseUrl + APIS.REVIEWS.addReview,
        data
    })
}

export const deleteReview = (id) => {
    return fetch({
        method: "post",
        url: BaseUrl + APIS.REVIEWS.deleteReview(id)
    })
}

export const getReviews = () => {
    return fetch({
        method: "get",
        url: BaseUrl + APIS.PUBLIC.reviews
    })
}
