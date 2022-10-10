import todo from './todo.less'
import {Typography} from 'antd'
import {DeleteOutlined, SmileTwoTone} from '@ant-design/icons';
import {useState} from "react";
import {TodoItemType} from "../../../utils/types";
import {deleteTodo} from "../../../actions/resume";

const {Paragraph} = Typography;


export default function TodoItem(props: {
    item: TodoItemType,
    length: number
}) {

    const finishIcon = <SmileTwoTone twoToneColor={"#FF8C00FF"}/>
    const unFinishIcon = <SmileTwoTone rotate={180} twoToneColor={"#8fbc8f"}/>

    const [item, setItem] = useState<TodoItemType>({
        id: props.item.id,
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
                    <DeleteOutlined onClick={() => {
                        deleteTodo(item.id).then((res) => {
                            props.length = props.length - 1;
                        })
                    }}/>
                </div>
            </div>
        </div>
    )
}