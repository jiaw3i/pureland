import {Avatar, Button, List, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import todo from './todo.less';
import {CheckSquareOutlined, BorderOutlined} from '@ant-design/icons';
import {isMainThread} from "worker_threads";
import {log} from "util";

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


    // const loadMore =
    //     !initLoading && !loading ? (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //                 marginTop: 12,
    //                 height: 32,
    //                 lineHeight: '32px',
    //             }}
    //         >
    //             <Button onClick={onLoadMore}>loading more</Button>
    //         </div>
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
        <main className={todo.todoMain}>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}

                renderItem={(item: Item) => {
                    return (
                        <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={item.isFinish ?
                                        <CheckSquareOutlined onClick={(): void => todoOnClick(item.id)}
                                                             className={todo.icon}/>
                                        : <BorderOutlined onClick={(): void => todoOnClick(item.id)}
                                                          className={todo.icon}/>}
                                    description={item.desc}
                                />
                            </Skeleton>
                        </List.Item>
                    )
                }}
            />
        </main>
    );
};

export default TodoList;