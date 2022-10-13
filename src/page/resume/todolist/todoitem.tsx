import todo from './todo.less'
import {Modal, Typography} from 'antd'
import {DeleteOutlined, SmileTwoTone, PlusCircleOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {TodoItemType} from "../../../utils/types";
import {addTodoItem, deleteTodo, getTodoList, updateTodoItem} from "../../../actions/resume";
import TextArea from "antd/es/input/TextArea";
import {openError, openSuccess} from "../../../utils/util";

const {Paragraph} = Typography;


export default function TodoItem(props: {
    item: TodoItemType,
    length: number,
    setTodos: Function,
}) {

    const finishIcon = <SmileTwoTone twoToneColor={"#FF8C00FF"}/>
    const unFinishIcon = <SmileTwoTone rotate={180} twoToneColor={"#8fbc8f"}/>

    const [item, setItem] = useState<TodoItemType>({
        id: props.item.id,
        userId: props.item.userId,
        content: props.item.content,
        status: props.item.status,
        createTime: props.item.createTime,
    });
    const [editOpen, setEditOpen] = useState(false);
    const [editContent, setEditContent] = useState(item.content);

    const finishOnClick = () => {
        if (item.status === 0) {
            item.status = 1;
        } else {
            item.status = 0;
        }
        let newItem = {...item};
        setItem(newItem);

        updateTodoItem(newItem).then((res) => {
            console.log("todoItem#finishOnClick ", res);
        });
    };
    const isFinish = (status: number) => {
        return status === 1;
    };
    const setEditableStr = (content: string) => {
        item.content = content;
        let newItem = {...item};
        setItem(newItem);
    };
    const deleteOnClick = () => {
        deleteTodo(item.id).then((res) => {
            console.log("todoItem#deleteOnClick ", res);
            if (res.success) {
                openSuccess("top", "删除成功");
                getTodoList().then((res) => {
                    props.setTodos(res.data);
                });
            } else {
                openError("top", res.message);
            }
        });
    };
    const onTodoContentOk = () => {
        addTodoItem(editContent).then((res) => {
            console.log("todoItem#onTodoContentOk ", res);
            if (res.success) {
                getTodoList().then((res) => {
                    props.setTodos(res.data);
                    //提示添加成功
                    openSuccess("top", "添加成功");
                });
            } else {
                Modal.error({
                    title: "添加失败",
                    content: res.message,
                });
            }
            // 关闭弹窗
            setEditOpen(false);
        });
    };
    const editableStr = (content: string) => {
        return <Modal
            open={editOpen}
            title={"输入待办事项"}
            onOk={onTodoContentOk}
            onCancel={() => {
                setEditOpen(false)
            }}
            okText={"确认"}
            cancelText={"取消"}

        >
            <TextArea autoSize={{minRows: 3, maxRows: 5}} placeholder={"请输入待办事项"} value={editContent}
                      onChange={(e) => {
                          setEditContent(e.target.value)
                      }}/>
        </Modal>
    };

    console.log("todoItem#render ", props);
    return props.length === 0 ? (
            <div className={todo.todoItemMain}>
                <div className={todo.todoAddItemContent}>
                    <PlusCircleOutlined onClick={() => {
                        setEditOpen(true)
                    }}/>
                </div>
                {editableStr(editContent)}
            </div>
        ) :
        (
            <div className={todo.todoItemMain}>
                <div className={todo.icon} onClick={(): void => {
                    finishOnClick()
                }}>
                    {isFinish(item.status) ? finishIcon : unFinishIcon}
                </div>
                <div className={todo.todoItemCA}>
                    <div className={todo.todoItemContent}>
                        <Paragraph editable={{
                            onChange: setEditableStr,
                            triggerType: ["text"],
                            enterIcon: null
                        }}>{item.content}</Paragraph>
                    </div>
                    <div className={todo.todoItemAction}>
                        <DeleteOutlined onClick={deleteOnClick}/>
                    </div>
                </div>
                {editableStr(editContent)}
            </div>
        )
}