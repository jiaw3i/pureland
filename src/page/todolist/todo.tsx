import {Avatar, Button, List, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import todo from './todo.less';
import {SmileFilled, BorderOutlined} from '@ant-design/icons';
import {isMainThread} from "worker_threads";
import TodoItem from "./todoitem";
import {TodoItemProps} from "./todoitem";

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
    const items: Array<TodoItemProps> = [
        {
            id: 1,
            title: "今天写完大字作业",
            isFinish: false,
            isTop: false,
        },
        {
            id: 2,
            title: "参加2点的会议",
            isFinish: false,
            isTop: false,
        },
        {
            id: 3,
            title: "完成履历卡片",
            isFinish: false,
            isTop: false,
        },
        {
            id: 4,
            title: "长文字测试长文字测试长文字测试长文字测试长文字测试长文字测试",
            isFinish: false,
            isTop: false,
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

    //     ) : null;
    return (
        <div className={todo.todoMain}>
            {
                items.map((item) => <TodoItem {...item}/>)
            }

            {/*<List*/}
            {/*    className="demo-loadmore-list"*/}
            {/*    loading={initLoading}*/}
            {/*    itemLayout="horizontal"*/}
            {/*    dataSource={list}*/}

            {/*    renderItem={(item: Item) => {*/}
            {/*        return (*/}
            {/*            <List.Item*/}
            {/*                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}*/}
            {/*            >*/}
            {/*                <Skeleton avatar title={false} loading={item.loading} active>*/}
            {/*                    <List.Item.Meta*/}
            {/*                        avatar={item.isFinish ?*/}
            {/*                            <CheckSquareOutlined onClick={(): void => todoOnClick(item.id)}*/}
            {/*                                                 className={todo.icon}/>*/}
            {/*                            : <BorderOutlined onClick={(): void => todoOnClick(item.id)}*/}
            {/*                                              className={todo.icon}/>}*/}
            {/*                        description={item.desc}*/}
            {/*                    />*/}
            {/*                </Skeleton>*/}
            {/*            </List.Item>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default TodoList;