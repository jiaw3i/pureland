import React, {useEffect, useState} from 'react';
import todo from './todo.less';
import {TodoItemType} from "../../../utils/types";
import TodoItem from "./todoitem";
import {getTodoList} from "../../../actions/resume";

const TodoList = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState<Array<TodoItemType>>([]);

    useEffect(() => {
        setInitLoading(false);
        getTodoList().then((res) => {
            if (res.data !== null) {
                setTodos(res.data);
            } else {
                setTodos([]);
            }
        });
        console.log("useEffect", todos);
    }, []);


    // function todoOnClick(id: number) {
    //     let dataById = getDataById(id);
    //
    //     if (dataById != null) {
    //         dataById.status===0?dataById.status=1:dataById.status=0;
    //     }
    //     // console.log(getDataById(id))
    //     setTodos([...todos]);
    // }
    return (
        <div className={todo.todoMain}>
            {
                todos.length > 0 ?
                    <div>{

                        todos.map((item) => <TodoItem key={item.id} item={item} length={todos.length}
                                                      setTodos={setTodos}/>)
                    }
                    <TodoItem key={""} item={{} as TodoItemType} length={0} setTodos={setTodos}/>

                    </div>
                    : <TodoItem key={""} item={{} as TodoItemType} length={todos.length} setTodos={setTodos}/>
            }
        </div>
    );
};

export default TodoList;