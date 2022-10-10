import request from "../utils/request";
import {UserInfo} from "../utils/types";

export function getUserInfo() {
    return request({
        url: '/pluser/getUserInfo',
        method: 'GET',
    })
}

export function updateUserInfo(userInfo: UserInfo) {
    return request({
        url: '/pluser/updateUserInfo',
        method: 'POST',
        params: {...userInfo}
    })
}

export function deleteTodo(id: number) {
    return request({
        url: '/pluser/todo/deleteTodo',
        method: 'GET',
        params: {
            todoId: id,
        },
    })
}

export function deleteUserAllTodo(id: number) {
    return request({
        url: '/pluser/deleteUserTodo',
        method: 'GET',
        params: {
            userId: id,
        },
    })
}

export function login(username: string, password: string) {
    return request({
        url: '/system/login',
        method: 'POST',
        params: {
            username: username,
            credit: password,
        },
    })
}