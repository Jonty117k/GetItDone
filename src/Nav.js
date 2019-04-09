import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './config/Fire';
import WOW from "wowjs";
import $ from "jquery";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
class Nav extends Component {

	state = {
		username: "",
	}

	componentWillMount = (e) => {
		this.setState({username:localStorage.getItem("username")});
	}

render() {

	let username = this.state.username;

	const calendar = (
	  <Tooltip id="tooltip">
	    <strong>Your weekly planner calendar</strong>
	  </Tooltip>
	);
	const dinner = (
	  <Tooltip id="tooltip">
	    <strong>This week's shopping list</strong>
	  </Tooltip>
	);
	const exercise = (
	  <Tooltip id="tooltip">
	    <strong>Exercise goals</strong>
	  </Tooltip>
	);	
	const music = (
	  <Tooltip id="tooltip">
	    <strong>Music Practice</strong>
	  </Tooltip>
	);		
	const code = (
	  <Tooltip id="tooltip">
	    <strong>Programming Practice</strong>
	  </Tooltip>
	);
	const clear = (
	  <Tooltip id="tooltip">
	    <strong>Delete all weekly entries</strong>
	  </Tooltip>
	);	

	return(
		<nav class="navbar navbar-inverse wow fadeInDown animated">
				<div className="username-display">{username}</div>
			<div className="nav-title">GetItDone</div>
			<OverlayTrigger placement="bottom" overlay={clear}>
				<img src="images/delete.png" className="but delete-btn"></img>
			</OverlayTrigger>
			<OverlayTrigger placement="bottom" overlay={code}>
				<img src="images/code.png" className="but code-btn"></img>
			</OverlayTrigger>	
			<OverlayTrigger placement="bottom" overlay={music}>
				<img src="images/music.png" className="but music-btn"></img>
			</OverlayTrigger>	
			<OverlayTrigger placement="bottom" overlay={exercise}>
				<img src="images/exercise.png" className="but exercise-btn"></img>
			</OverlayTrigger>	
			<OverlayTrigger placement="bottom" overlay={dinner}>
				<img src="images/dinner.png" className="but dinner-btn"></img>
			</OverlayTrigger>	
			<OverlayTrigger placement="bottom" overlay={calendar}>
				<img src="images/calendar.png" className="but cal-btn"></img>
			</OverlayTrigger>
		</nav>
		);
	}
}

export default Nav;