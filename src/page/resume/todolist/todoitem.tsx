import todo from './todo.less'
import {Typography} from 'antd'
import {DeleteOutlined, SmileTwoTone} from '@ant-design/icons';
import {useState} from "react";
import {TodoItemType} from "../../../utils/types";
import {deleteTodo, getTodoList, updateTodoItem} from "../../../actions/resume";

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
        // TODO: 更新数据库
    }
    const isFinish = (status: number) => {
        return status === 1;

    }
    const setEditableStr = (content: string) => {
        item.content = content;
        let newItem = {...item};
        setItem(newItem);
    }

    const deleteOnClick = () => {
        deleteTodo(item.id).then((res) => {
            console.log("todoItem#deleteOnClick ", res);
            if (res.success) {
                getTodoList().then((res) => {
                    props.setTodos(res.data);
                });
            }
        });
    }

    return (
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
        </div>
    )
}