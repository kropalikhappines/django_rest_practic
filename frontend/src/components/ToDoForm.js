import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {todo_proj: 0, todo_user: 0, text_proj: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }


    handleAuthorChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'project':[]
            })
            return;
        }


        // let proj = event.target.selectedOptions.item(0).value
        // console.log(event.target.selectedOptions.item(0).value)
        // let projects = []
        // for(let i = 0; i < event.target.selectedOptions.length;i++){
        //     projects.push(event.target.selectedOptions.item(i).value)
        //     // console.log(event.target.selectedOptions.item(0).value)
        // }
        this.setState({
            'project': event.target.selectedOptions.item(0).value
        })
        
        // console.log(this.state.project)
    }

    
    

    handleSubmit(event) {
        console.log(this.state.project)
        console.log(this.props.userId)
        console.log(this.state.text_proj)
        if(this.state.project === undefined){
            this.props.createTodo(1, this.props.userId, this.state.text_proj)
            // console.log('Default 1')
            event.preventDefault()
        } else if (this.state.project !== undefined){
            this.props.createTodo(this.state.project, this.props.userId, this.state.text_proj)
            // console.log('Take')
            event.preventDefault()
        }
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                {/* <div className="form-group">
                    <label for="todo_proj">Name project </label>
                    <input type="text" className="form-control" name="todo_proj"
                    value={this.state.todo_proj} onChange={(event)=>this.handleChange(event)} />
                </div> */}
                <select name="todo_proj" onChange = {(event) => this.handleAuthorChange(event)}>
                    {/* {console.log(this.props.users)} */}
                    {this.props.projects.map((project) => <option value={project.id}>{project.name_proj}</option>)}
                </select>
                {/* <div className="form-group">
                    <label for="todo_user">User </label>
                    <input type="number" className="form-control" name="todo_user"
                    value={this.props.user} onChange={(event)=>this.handleChange(event)} />
                </div> */}
                <div name="todo_user">
                    {/* {console.log(this.props.user)} */}
                    {this.props.user}
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