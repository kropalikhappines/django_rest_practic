import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import UserList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Projects';
import TodoList from './components/todo';
import NotFound404 from './components/NotFound';
import ProjItemList from './components/ProjectDeateil';
import LoginForm from './components/Auth';
import ProjectForm from './components/ProjectForm';
import ToDoForm from './components/ToDoForm';
import {HashRouter, Route, BrowserRouter, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : [],
      projects : [],
      todos : [],
      token: '',
      username: '',
    }
  }


  set_token(token, username) {
    const cookies = new Cookies()
    
    // console.log(cookies.set('usernam'))
    cookies.set('username', username)
    cookies.set('token', token)
    // console.log(cookies)
    this.setState({'token': token,},()=>this.load_data())
    this.setState({'username': username},()=>this.load_data())
  }


  get_token(username, password){
    // const user = username
    // console.log(user)

    axios.post('http://127.0.0.1:8000/api/token/', {'username': username, 'password': password})
    .then(response => {
      const user = username
      this.set_token(response.data['access'], user)
    }).catch(error => alert('Wrong login or password')) 
    // return user

  }
  

  is_auth(){
    return !!this.state.token
  }


  get_headers(){
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    }
    // console.log(this.is_auth())
    if(this.is_auth()){
      headers['Authorization'] = `Bearer ${this.state.token}`
    }
    return headers
  }


  logout() {
    this.set_token('')

  }


  get_token_from_cookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const usr = cookies.get('username')
    this.setState({'token': token}, ()=>this.load_data())
    this.setState({'username': usr}, ()=>this.render())
  }


  load_data() {
    const usr = this.state.username
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
      .then(response => {
        // console.log(response.data.results)
          this.setState({users: response.data.results})
        }).catch(error => console.log(error))
    
    axios.get('http://127.0.0.1:8000/api/Projects/', {headers})
      .then(response => {
        // console.log(response.data.results)
          this.setState({projects: response.data.results.filter((project) => project.active_or_close !== false)})
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/ToDo/', {headers})
      .then(response => {
        // console.log(response.data.results.filter((todo) => todo.active_or_close !== false))
          this.setState({todos: response.data.results.filter((todo) => todo.active_or_close !== false)})
        
        }).catch(error => console.log(error))

  }


  // delete and create todo 
  deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/ToDo/${id}`, {headers}).then(response => {
      this.setState( {
        
        'todos': this.state.todos.filter((todo) => todo.id !== id)
    })
  // console.log(id)
  }).catch(error => console.log(error))
    // console.log(id)

  }
  deleteProjects(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/Projects/${id}`, {headers}).then(response => {
      this.setState( {
        
        'projects': this.state.projects.filter((project) => project.id !== id)
    })
  // console.log(id)
  }).catch(error => console.log(error))
    // console.log(id)
  }

  createProject(name_proj, repo_proj, users_proj) {
    const headers = this.get_headers()
    const data = {'name_proj': name_proj, 'repo_proj': repo_proj, 'users_proj': users_proj}
    console.log(data)
  
    axios.post(`http://127.0.0.1:8000/api/Projects/`, data, {headers})
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
      this.setState({projects:[]})
  }

  createTodo(todo_proj, todo_user, text_proj) {
    const headers = this.get_headers()
    const data = {'todo_proj': todo_proj, 'todo_user': todo_user, 'text_proj': text_proj}
    // console.log(data)
  
    axios.post(`http://127.0.0.1:8000/api/ToDo/`, data, {headers})
      .then(response => {
        this.load_data()
      }).catch(error => console.log(error))
      this.setState({todos:[]})
  }

  


  componentDidMount() {
    this.get_token_from_cookies()

  }


  render () {
    return (
      <div>
        <Menu />
        <BrowserRouter>
          <nav>
            <ul>
              <li><Link to='/'>Users</Link></li>
            </ul>
            <ul>
              <li><Link to='/projects'>Projects</Link></li>
            </ul>
            <ul>
              <li><Link to='/todo'>Todo</Link></li>
            </ul>
            <ul>
              <li>
                {this.is_auth()? <button onClick={()=> this.logout()}>{this.state.username} Logout</button>:
                <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />}/>
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                          deleteProjects={(id) => this.deleteProjects(id)} />}/>
            <Route exact path='/Projects/create' component={() => <ProjectForm users = {this.state.users} createProject={(name_proj, repo_proj, users_proj) => this.createProject(name_proj, repo_proj, users_proj)}/>}/>

            <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}
                                                                          deleteTodo={(id) => this.deleteTodo(id)} />}/>
            <Route exact path='/todo/create' component={() => <ToDoForm projects = {this.state.projects} user = {this.state.username} createTodo={(todo_proj, todo_user, text_proj) => this.createTodo(todo_proj, todo_user, text_proj)}/>}/>

            
            <Route exact path='/project/:id' component={() => <ProjItemList projects={this.state.projects} users={this.state.users} />}/>

            <Route exact path='/login' component={() => <LoginForm get_token={(username,password)=> this.get_token(username,password)} />}/>
{/*         
            <Route path='/projects/:id'>
              <ProjItemList projects={this.state.projects}/>
            </Route> */}


            <Redirect from='/project' to='/projects'></Redirect>
            <Route component={NotFound404}/>
          </Switch>
        </BrowserRouter>


        <Footer />
      </div>
    );
  }
}

export default App;
