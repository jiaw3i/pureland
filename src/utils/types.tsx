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

export type ExperienceItemType = {
    id: number;
    userId: number;
    unit: string;
    job: string;
    description: string;
    startDate: string;
    endDate: string;
}