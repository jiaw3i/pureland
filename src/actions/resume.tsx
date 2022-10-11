import request from "../utils/request";
import {ExperienceItemType, UserInfo} from "../utils/types";

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

export function register(username: string, password: string,phone: string) {
    return request({
        url: '/system/register',
        method: 'POST',
        params: {
            username: username,
            credit: password,
            phone: phone,
        },
    })
}

export function smsCode(phone: string) {
    return request({
        url: '/system/smscode',
        method: 'GET',
        params: {
            phone: phone,
        }
    })
}

export function verifySmsCode(phone: string, code: string) {
    return request({
        url: '/system/verifySmsCode',
        method: 'GET',
        params: {
            phone: phone,
            code: code,
        }
    })
}

export function getPlExperiences() {
    return request({
        url: '/pluser/experience/list',
        method: 'GET',
    })
}

export function addPlExperience(experience: ExperienceItemType) {
    return request({
        url: '/pluser/experience/add',
        method: 'POST',
        params: {...experience}
    })
}
export function updatePlExperience(experience: ExperienceItemType) {
    return request({
        url: '/pluser/experience/update',
        method: 'POST',
        params: {...experience}
    })
}
export function deletePlExperience(id: number) {
    return request({
        url: '/pluser/experience/delete',
        method: 'GET',
        params: {
            experienceId: id,
        },
    })
}