import React from 'react'


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.todo_proj}</td>
            <td>{todo.todo_user}</td>
            
            <td>{todo.text_proj}</td>
            <td>{todo.created_at}</td>
            <td><button onClick={()=> deleteTodo(todo.id)} type="button">Delete</button></td>
            


        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
    return (
        <table>
            <tr>
                <th>Id proj</th>
                <th>Id user</th>
                <th>text_proj</th>

                <th>Created todo</th>
                <th></th>

            </tr>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}


export default TodoList