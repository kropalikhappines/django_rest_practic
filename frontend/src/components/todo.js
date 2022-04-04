import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.todo_proj}</td>
            <td>{todo.todo_user}</td>
            
            <td>{todo.text_proj}</td>
            <td>{todo.created_at}</td>


        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <tr>
                <th>Id proj</th>
                <th>Id user</th>
                <th>text_proj</th>

                <th>Created todo</th>

            </tr>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}


export default TodoList