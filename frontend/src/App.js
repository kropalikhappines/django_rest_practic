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
import {HashRouter, Route, BrowserRouter, Link, Switch, Redirect} from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : [],
      projects : [],
      todos : []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        console.log(response.data.results)
          this.setState({users: response.data.results})
        }).catch(error => console.log(error))
      
    axios.get('http://127.0.0.1:8000/api/Projects/')
      .then(response => {
        console.log(response.data.results)
          this.setState({projects: response.data.results})
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/ToDo/')
      .then(response => {
        console.log(response.data.results)
          this.setState({todos: response.data.results})
        }).catch(error => console.log(error))
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
            {/* <Route path='/project/:id'>
              <ProjectInfo projects={this.state.projects}/>
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
