import React, {useEffect, useState} from 'react';
import todo from './todo.less';
import {TodoItemType} from "../../utils/types";
import TodoItem from "./todoitem";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


class Item {
    id: number;
    name: {};
    picture: {};
    title: string;
    desc: string;
    loading: boolean;
    createTime: string;
    updateTime: string;
    finishTime: string;
    deleteTime: string;
    isDelete: boolean;
    isFinish: boolean;
    isTop: boolean;


    constructor(id: number, name: {}, picture: {}, title: string, desc: string, loading: boolean, createTime: string, updateTime: string, finishTime: string, deleteTime: string, isDelete: boolean, isFinish: boolean, isTop: boolean) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.title = title;
        this.desc = desc;
        this.loading = loading;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.finishTime = finishTime;
        this.deleteTime = deleteTime;
        this.isDelete = isDelete;
        this.isFinish = isFinish;
        this.isTop = isTop;
    }

}


const TodoList = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Array<Item>>([]);
    const items: Array<TodoItemType> = [
        {
            id: 1,
            content: "今天写完大字作业",
            status: 1,
            createTime: "2022-01-01 00:00:00"
        },
        {
            id: 2,
            content: "参加2点的会议",
            status: 1,
            createTime: "2022-01-01 00:00:00"
        },
        {
            id: 3,
            content: "完成履历卡片",
            status: 1,
            createTime: "2022-01-01 00:00:00"
        },
        {
            id: 4,
            content: "长文字测试长文字测试长文字测试长文字测试长文字测试长文字测试",
            status: 1,
            createTime: "2022-01-01 00:00:00"
        }
    ];

    function getDataById(id: number) {
        return list.find((item) => item.id === id);
    }

    useEffect(() => {
        setInitLoading(false);
        for (let i = 0; i < 10; i++) {
            let item = new Item(i, {}, {}, "title", "desc" + i, false, "", "", "", "", false, false, false)
            list.push(item)
        }
        setList(
            list
        );
    }, []);


    function todoOnClick(id: number) {
        let dataById = getDataById(id);

        if (dataById != null) {
            dataById.isFinish = !dataById.isFinish;
        }
        console.log(getDataById(id))
        let list2: Array<Item> = [];
        Object.assign(list2, list);
        setList(list2);
    }
    return (
        <div className={todo.todoMain}>
            {
                items.map((item) => <TodoItem key={item.id} item={item} length={items.length}/>)
            }
        </div>
    );
};

export default TodoList;