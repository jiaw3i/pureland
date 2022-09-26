import todo from './todo.less'
import {CheckSquareOutlined, BorderOutlined} from '@ant-design/icons';


export type TodoItemProps = {
    id: number;
    title: string;
    isFinish: boolean;
    isTop: boolean;
}
export default function TodoItem(props: TodoItemProps) {




    return (
        <div className={todo.todoItemMain}>
            <div className={todo.icon}>
                {props.isFinish ? <CheckSquareOutlined/> : <BorderOutlined/>}
            </div>
            <div className={todo.todoItemCA}>
                <div className={todo.todoItemContent}>
                    {props.title}
                </div>
                <div className={todo.todoItemAction}>
                </div>
            </div>
        </div>
    )


}