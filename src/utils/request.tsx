import axios, {AxiosRequestConfig} from 'axios'
import config from '../config'
import {unset} from 'lodash'

const request = (options: AxiosRequestConfig<any>) => {
    const {serverApi, baseUrl} = config
    axios.defaults.baseURL = `${baseUrl}`
    console.log(serverApi, baseUrl)
    const {url, method = 'GET', params = {}} = options
    if (method === 'GET') {
        options.params = params
    } else {
        options.data = params
        unset(options, 'params')
    }
    let token = localStorage.getItem("AuthToken");
    return axios({
        url,
        withCredentials: false,
        timeout: 1000 * 10,
        headers: token === null ? {} : {'AuthToken': token},
        ...options,
    }).then(response => response.data)
        .catch(err => {
            console.log(`请求失败:`, err)
            console.log(`入参:`, options)
            return {message: '请求异常，请重试', success: false}
        })
}

export default request