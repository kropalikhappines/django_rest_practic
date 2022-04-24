import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {todo_proj: '', todo_user: 0, text_proj: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.todo_proj)
        console.log(this.state.todo_user)
        console.log(this.state.text_proj)
        this.props.createTodo(this.state.todo_proj, this.state.todo_user, this.state.text_proj)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="todo_proj">Name project </label>
                    <input type="text" className="form-control" name="todo_proj"
                    value={this.state.todo_proj} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="todo_user">User </label>
                    <input type="number" className="form-control" name="todo_user"
                    value={this.state.todo_user} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="text_proj">Text </label>
                    <input type="text" className="form-control" name="text_proj"
                    value={this.state.text_proj} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ToDoForm