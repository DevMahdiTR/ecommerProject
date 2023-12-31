export const BaseUrl = 'https://api.click-and-shop.com/api'



export const  APIS = {
    AUTH: {
        login: '/login',
        register: '/register',
    },
    CATEGORIES: {
        getAndAddCategories : '/categories',
        updateGetByIdDelete:(id)=> `/categories/${id}`,
        getPublicCategories: '/public/categories'
    },
    ARTICLES : {
        getArticle: '/articles',
        addPhotos: '/medias',
        addArticle: '/articles',
        getById:(id)=> `/articles/${id}`
    },
    USER : {
        updateAvatar: `/users`
    },
    REVIEWS : {
        getAllReviews: `/reviews`,
        deleteReview: (id) => `/reviews/${id}`,
            addReview: `/reviews`
    },
    BANNERS : {
        addOrUpdate: `/banners`
    },
    PROMOTIONS : {
        add: `/promotions`,
        deactivate: (id) => `/promotions/${id}/updateStatus`,
        delete: (id) => `/promotions/${id}`
    },
    NEWSLETTER: {
        add:`/newsletter`
    },
    CART: {
        add: `/cart`,
        list: `/cart`,
        update: '/cart/article/quantity/update'
    },
    FAVORIES: {
        add: `/favories`,
        list: `/favories`,
        delete: (id) => `/favories/${id}`
    },
    COMMAND: {
            userCommand: `/commander`,
            getCommands: `/commandes`,
            adminGetCommands: `/admin/commandes`,
            deleteCommand:(id) => `/admin/commandes/${id}`,
        },
    PUBLIC: {
        articlesList:`/public/articles`,
        articlesDetails: (id) => `/public/articles/${id}/details`,
        categoriesList: `/public/categories`,
        banners: `/public/banners`,
        reviews: `/public/reviews`,
        articlesByCategories:  (id) => `/public/categories/${id}`,
        articlesByCategoriesAdmin:  (id) => `/public/categories/${id}`,
        articlesByMainCategories:  (id) => `/public/articles/categories/main/${id}`,
        newestArticles: (limit) => `/articles/newest/${limit}`,
    }

}
