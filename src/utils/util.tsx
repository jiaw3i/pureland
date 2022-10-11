import {NotificationPlacement} from "antd/es/notification";
import {notification} from "antd";

export const isServer = typeof window === 'undefined'

export const findByValue = (array: any[], key: string | number, value: any, { childKey = 'children' } = {}) => {
    let obj: any
    array.some(function iter(item) {
        if (item[key] === value) {
            obj = item
            return true
        }
        return Array.isArray(item[childKey]) && item[childKey].some(iter)
    })
    return obj
}

export const openNotification = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.error({
        message: message,
        placement,
    });
};