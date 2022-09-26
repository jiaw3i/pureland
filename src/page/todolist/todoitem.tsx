import todo from './todo.less'
import {Typography } from 'antd'
import {CheckSquareOutlined, EditTwoTone ,SmileTwoTone} from '@ant-design/icons';
import {useState} from "react";
import {text} from "stream/consumers";
const { Paragraph } = Typography;

export type TodoItemProps = {
    id: number;
    title: string;
    isFinish: boolean;
    isTop: boolean;
}
export default function TodoItem(props: TodoItemProps) {

    const finishIcon = <SmileTwoTone twoToneColor={"#FF8C00FF"}/>
    const unFinishIcon = <SmileTwoTone rotate={180} twoToneColor={"#8fbc8f"}/>
    const [item, setItem] = useState<TodoItemProps>({
        id: props.id,
        title: props.title,
        isFinish: props.isFinish,
        isTop: props.isTop,
    });

    const finishOnClick = () => {
        console.log(item.isFinish)
        item.isFinish = !item.isFinish;
        let newItem = {...item};
        setItem(newItem);
        // TODO: 更新数据库
    }
    const setEditableStr = (title:string) => {
        item.title = title;
        let newItem = {...item};
        setItem(newItem);
    }
    return (
        <div className={todo.todoItemMain}>
            <div className={todo.icon} onClick={():void=>{finishOnClick()}}>
                {item.isFinish ? finishIcon : unFinishIcon}
            </div>
            <div className={todo.todoItemCA}>
                <div className={todo.todoItemContent}>
                    <Paragraph editable={{ onChange: setEditableStr,triggerType:["text"],enterIcon:null }}>{props.title}</Paragraph>
                </div>
                <div className={todo.todoItemAction}>
                    <EditTwoTone />
                </div>
            </div>
        </div>
    )


}