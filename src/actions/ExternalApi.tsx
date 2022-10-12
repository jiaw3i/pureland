import request from "../utils/request";

export function oneContent() {
    return request(
        {
            url: 'one',
            method: 'GET',
            baseURL: "oneApi"
        }
    )
}

export function requestOneImage() {
    return request({
        url: 'one',
        method: 'GET',
        baseURL: "oneImageApi",
        params: {
            category: '{dongman,fengjing}',
        }
    })
}
