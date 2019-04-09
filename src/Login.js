import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './config/Fire';
import WOW from "wowjs";
import $ from "jquery";
import {reactLocalStorage} from 'reactjs-localstorage';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    localStorage.setItem("username", this.state.email);
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
    console.log(localStorage.getItem("username"));
  }

  signup(e){    
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{
      console.log(u)
      localStorage.setItem("username", this.state.email);
      const userRef = db.collection('users').add({
          username:this.state.email
        });  
    }).catch((error) => {
        console.log(error);
      })
  }
  render() {

    const login = (
      <Tooltip id="tooltip">
        <strong>Login</strong>
      </Tooltip>
    );  
    const signup = (
      <Tooltip id="tooltip">
        <strong>Sign up new account</strong>
      </Tooltip>
    );  
    return (

    <div>
      <div className="wow fadeInDown animated" data-wow-delay=".7s">
        <div className="row text-center login-container">
          <div className="login-title">GetItDone</div>
          <form>
            <div className="username row text-center">
            <div class="form-group">
               <img className="user-pic" src="images/user.png"></img>
               <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="user-name-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
               <small id="emailHelp" class="form-text text-muted"></small>
             </div>
            </div>
            <div class="form-group">
                <img className="lock-pic" src="images/padlock.png"></img>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="pw-input" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="options wow bounce animated" data-wow-delay="1.6s">
              <OverlayTrigger placement="bottom" overlay={login}>
                <img onClick={this.login} className="login-btn" src="images/login.png"></img>
              </OverlayTrigger> 
              <OverlayTrigger placement="bottom" overlay={signup}> 
                <img onClick={this.signup} className="signup-btn" src="images/user-plus.png"></img>
              </OverlayTrigger>   
              <img className="settings-btn" src="images/settings.png"></img>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
export default Login;
