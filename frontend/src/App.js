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
import {HashRouter, Route, BrowserRouter, Link, Switch, Redirect} from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : [],
      projects : [],
      todos : [],
      token: '',
    }
  }

  load_data() {
  axios.get('http://127.0.0.1:8000/api/users/')
    .then(response => {
      // console.log(response.data.results)
        this.setState({users: response.data.results})
      }).catch(error => console.log(error))
  
  axios.get('http://127.0.0.1:8000/api/Projects/')
    .then(response => {
      // console.log(response.data.results)
        this.setState({projects: response.data.results})
      }).catch(error => console.log(error))

  axios.get('http://127.0.0.1:8000/api/ToDo/')
    .then(response => {
      // console.log(response.data.results)
        this.setState({todos: response.data.results})
      }).catch(error => console.log(error))

  }


  get_token(username, password){
    
    axios.post('http://127.0.0.1:8000/api/token/', {'username': username, password: password})
    .then(response => {
      // console.log(response.data.results)
      console.log(response.data['access'])
    }).catch(error => console.log(error))  }


  componentDidMount() {
    this.load_data()
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
          </nav>

          <Switch>
            <Route exact path='/' component={() => <UserList users={this.state.users} />}/>
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />}/>
            <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />}/>
            
            
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
