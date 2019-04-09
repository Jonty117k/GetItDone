import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './config/Fire';
import WOW from "wowjs";
import $ from "jquery";
import Collapsible from 'react-collapsible';
import CalItem from './CalItem';
import {reactLocalStorage} from 'reactjs-localstorage';
import 'font-awesome/css/font-awesome.min.css';

class Sunday extends Component {
	  //This is the initial or "default" state of our component
	  state = {
	    items: [],
	    item: "",
	    name: "",
	    Sunday: [],
	    username: "",
	  }

	  //This is a function that is invoked onClick
	  clearItems = () => {
	    //This is how we update the state
	    this.setState({items:[]});
	  }

	  //We wanna update the state every time the value is changed
	  handleChange = (event) => {
	    this.setState({item:event.target.value});
	    this.setState({name:event.target.name});
	  }

	  //Now we are ready to save it to the items list
	  addItem = (event, name) => {
	    event.preventDefault(); //prevents the form from submitting
	    let items = this.state.items; //get the array from state
	    let Sun = this.state.Sunday;
	    const db = firebase.firestore();
		db.settings({
		  timestampsInSnapshots: true
		});
		
	    if(this.state.item){  //make sure there's an item to add. "" will return falsey
	    	if (this.state.name === "Sunday") {
	    		console.log('input logged');
	    		Sun.push(this.state.item); //add it to the array
	      		this.setState({Sun, item:""}); //updates items and resets item
				const userRef = db.collection('todos').doc('Sunday').collection('tasks').add({
					item:this.state.item,
					username:this.state.username
  				});  
	    	}
	    }
	  }

	  //Delete it from state
	  deleteItem = (index) => {
	    let Sun = this.state.Sunday; //get the array from state
	    var i = Sun.indexOf(index);
	    Sun.splice(i, 1); //cutout the value at that index
	    this.setState({Sun}); //set the state
	  	const db = firebase.firestore();	    
	    const docRef = db.collection('todos').doc('Sunday').collection('tasks');
	    docRef.get().then(snapshot => {
		    snapshot.forEach(doc => {
    			if (doc.exists) {
    				var myDoc = doc.data().item;
    				if (myDoc === index) {
    					docRef.doc(doc.id).delete();
    					console.log(myDoc);
    				}
    			}
		    });
		  }).catch(err => {
		    console.log('nope, didnt work');
		  });
		}

	  componentDidMount(item) {
	   	const wow = new WOW.WOW();
	   	wow.init();
	  }

	  componentWillMount(index) {

	  	this.setState({username:localStorage.getItem("username")});

	  	const db = firebase.firestore();
	    const docRef = db.collection('todos').doc('Sunday').collection('tasks');

	    docRef.get().then(snapshot => {
		    snapshot.forEach(doc => {
		      if (doc.data().username === this.state.username) {
			      this.setState({item:doc.data().item});
			      let Sun = this.state.Sunday;	
			      Sun.push(this.state.item);
			      console.log(this.state.Sunday);		      
		  	  }
		  	  this.setState({item:""});	
		    });
		  }).catch(err => {
		    console.log('Error getting documents', err);
		  });
	  	}


	render() { 
	    let Sun = this.state.Sunday.map((value, index) =>
	      <li key={index} name={value} className="list list-group-item wow fadeInDown animated">
	        {value}
	        <i onClick={e => this.deleteItem(value, index)} className="delete fa-lg fa fa-minus-circle float-right" aria-hidden="true"></i>
	      </li>
	    );
	return (

					  <Collapsible trigger="Sunday" classParentString="monCal cal" className="wow fadeInLeft animated" data-wow-delay="1s">
					  	<div className="to-do-list" >
					  		<form>
					  		    <input 
					  		    	ref="someName"
					  		    	className="task-input"
						            placeholder="Type an item here"
						            onChange={this.handleChange}
						            value={this.state.item}
						            name="Sunday"
					  		    />
            					<button className="task-add" type="submit" onClick={this.addItem}> Add Task </button>
					  		</form>
					  		    <ul className="list-group mb-3">
						          {Sun}
						        </ul>
					  	</div>
				      </Collapsible>
		);
	}
}

export default Sunday;