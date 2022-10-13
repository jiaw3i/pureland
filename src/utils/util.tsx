import {NotificationPlacement} from "antd/es/notification";
import {notification} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

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

export const openError = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.error({
        message: message,
        placement,
    });
};


export const openSuccess = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.success({
        message: message,
        placement,
    });
};

export const openWarning = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.warning({
        message: message,
        placement,
    });
}

export const openInfo = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.info({
        message: message,
        placement,
    });
}

export const openLoading = (placement: NotificationPlacement, message: string) => {
    notification.config({duration: 1.5});
    notification.open({
        message: message,
        placement,
        duration: 0,
        icon: <LoadingOutlined style={{color: '#108ee9'}}/>
    });
}

export const closeLoading = () => {
    notification.close(
        "loading"
    );
}
