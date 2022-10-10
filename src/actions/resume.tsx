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

export function deleteTodo(id:number){
    return request({
        url: '/deleteTodo',
        method: 'GET',
        params: {
            todoId: id,
        },
    })
}

export function deleteUserTodo(id:number){
    return request({
        url: '/deleteUserTodo',
        method: 'GET',
        params: {
            userId: id,
        },
    })
}
export function login(username:string,password:string){
    return request({
        url: '/login',
        method: 'POST',
        params: {
            username: username,
            credit: password,
        },
    })
}