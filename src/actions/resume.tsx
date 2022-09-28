import request from "../utils/request";

export function getUserInfo() {
    return request({
        url: '/getUserInfo',
        method: 'GET',
        params: {
            id: 1,
        },
    })
}