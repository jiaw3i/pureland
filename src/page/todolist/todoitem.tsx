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
    const [item, setItem] = useState(props);

    const finishOnClick = (item:TodoItemProps) => {
        console.log(item.isFinish)
        item.isFinish = !item.isFinish;
        setItem(item);
        // TODO: 更新数据库
    }
    const setEditableStr = (title:string) => {
        item.title = title;
        setItem(item);
    }
    return (
        <div className={todo.todoItemMain}>
            <div className={todo.icon} onClick={():void=>{finishOnClick(props)}}>
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