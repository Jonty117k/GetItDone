import React, { Component } from 'react';
import fire from './config/Fire';
import Nav from './Nav';
import Calendar from './Calendar';
import Tuesday from './Tuesday';
import Wednesday from './Wednesday';
import Thursday from './Thursday';
import Friday from './Friday';
import Saturday from './Saturday.js';
import Sunday from './Sunday';
import $ from "jquery";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="row">
                    <div className="calendars col-md-12">
                        <Calendar />
                        <Tuesday />
                        <Wednesday />
                        <Thursday /> 
                        <Friday />
                        <Saturday />
                        <Sunday />
                    </div>
                </div>
                <img className="logout-btn" src="images/logout.png" onClick={this.logout}></img>
            </div>
        );
    }
}

export default Home;
