export type UserInfo = {
    id: number;
    username: string;
    bornDate: string;
    familyAddress: string;
    residentialAddress: string;
    phone: string;
    college: string;
    major: string;
    skill: string;
    avatar: string;
}

export type TodoItemType = {
    id: number;
    content: string;
    status: number;
    createTime: string;
    // isTop: boolean;
}