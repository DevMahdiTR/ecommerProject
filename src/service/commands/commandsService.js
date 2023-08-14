import fetch from '../../config/interceptor/interceptor'
import {BaseUrl, APIS} from "../../config/constant/URLS";


export const userCommand = (data) => {
    return fetch({
        method: 'post',
        url: BaseUrl + APIS.COMMAND.userCommand,
        data
    })
}
export const getCommands = () => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.COMMAND.getCommands
    })
}
export const adminGetCommands = () => {
    return fetch({
        method: 'get',
        url: BaseUrl + APIS.COMMAND.adminGetCommands
    })
}
export const adminDeleteCommands = (id) => {
    return fetch({
        method: 'delete',
        url: BaseUrl + APIS.COMMAND.deleteCommand(id)
    })
}