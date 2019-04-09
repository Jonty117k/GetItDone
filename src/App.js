import React, { Component } from 'react';
import './App.css';
import Fire from './config/Fire';
import Home from './Home';
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
    // var ref = new Fire("https://chord-runner-1.firebaseio.com");
    // var authData = ref.getAuth();
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
    <div>
     <div className="App">
      {this.state.user ? ( <Home />) : (<Login/>)}
     </div>
    </div>
     );
  }
}

 export default App;
