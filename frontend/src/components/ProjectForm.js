import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name_proj: '', repo_proj: '', users_proj: 0}
        // console.log(this.state)
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
                'user':[]
            })
            return;
        }


        let users = []
        for(let i = 0; i < event.target.selectedOptions.length;i++){
            users.push(event.target.selectedOptions.item(i).index)
        }
        this.setState({
            'user': users
        })
        // console.log(users)
    }


    handleSubmit(event) {
        // console.log(this.state.name_proj)
        // console.log(this.state.repo_proj)
        // console.log(this.state.user)
        this.props.createProject(this.state.name_proj, this.state.repo_proj, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name_proj">Name project </label>
                    <input type="text" className="form-control" name="name_proj"
                    value={this.state.name_proj} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="repo_proj">Repository </label>
                    <input type="text" className="form-control" name="repo_proj"
                    value={this.state.repo_proj} onChange={(event)=>this.handleChange(event)} />
                </div>
                {/* <div className="form-group">
                    <label for="users_proj">Users </label>
                    <input type="number" className="form-control" name="users_proj"
                    value={this.state.users_proj} onChange={(event)=>this.handleChange(event)} />
                </div> */}

                <select multiple name="users_proj" onChange = {(event) => this.handleAuthorChange(event)}>
                    {/* {console.log(this.props.users)} */}
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm
