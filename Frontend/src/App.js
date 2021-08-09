import './App.css';
import Navbar from "./components/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './components/Login';
import Error from './components/Error';
import Signup from './components/Signup';
import Home from './components/Home';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import history from './components/History';
import books from "./books.jpg";
import NavbarHeader from './components/NavbarHeader';
import Sidebar from './components/Sidebar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      // logged_in:true,
      username: '',
      email:'',
      k:'',
      loginmodal:true
    };
  }
  
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
    fetch('http://localhost:8000/getexam/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        this.setState({k:json['data']})
        // console.log(json['data'])
      });
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => (res.ok)? (res.json()):('notoklogin'))
      .then(json => {
        console.log(json)
        localStorage.setItem('token', json.token);
        
        (json=='notoklogin') ?
        (this.setState({
          logged_in: false,
          displayed_form: 'error',
          username: '',
          email:''
        }))
        :
        (this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
          email:json.user.email,
        }))
        ;
        (this.state.logged_in==true)&&(history.push('/page1'))
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    
    fetch('http://localhost:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => (res.status==201)? (res.json()):('notoksignup'))
      .then(json => {
        console.log(json)
        localStorage.setItem('token', json.token);
        (json=='notoksignup')?
        (this.setState({
          logged_in: false,
          displayed_form: 'error',
          username: '',
          email:''
        })):
        (this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
          email: json.email
        }));
        (this.state.logged_in==true)&&(history.push('/page1'))
      });
      
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' ,email:'' });
    
    history.push('/')
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
  // console.log(this.state.email)
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <Login handle_login={this.handle_login} display_form={this.display_form}/>;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} display_form={this.display_form}/>;
        break;
      case 'error':
        form = <Error display_form={this.display_form}/>;
        break;
      default:
        form = null;
    }

    return (
      <div className="App" style={
                                  { backgroundImage: `url(${books})`}
                                  
                                  }>
                                   
        <Navbar
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          email={this.state.email}
          k={this.state.k}
        />
        
        
        <h3 style={{marginBottom:0}}>
        {this.state.logged_in
            ? ``
            : <NavbarHeader></NavbarHeader>}
            </h3>
        <Switch>
        <Route exact path='/'/>
        <Route exact path='/page1' component={Home} />
        <Route exact path='/page2' component={Page2} />
        <Route exact path='/page3' component={Page3} />
        <Route exact path='/page4' component={Page4} />
        
        
        </Switch>
        {/* <Sidebar/> */}
       <div className='App2'>
        {form}

        </div>

      </div>
    );
  }
}

export default App;

