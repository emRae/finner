import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin, setUser} from '../actions/auth';
import {setFlash} from '../actions/flash';
import {store} from '../store.js';
import { someStyle, greatStyle } from './styles.scss';

class Diet extends React.Component{
  state = {email, password, weight, height, age, sex, goals, restrictions, activityLevel, exclude}
  handleSubmit= (e) => {
    e.preventDefault();
    let {props: {location, dispatch, router}} = this;
    let {email, password, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;

    $.ajax({
      url:`/api/auth/about-diet`,
      type: 'PUT',
      data: { 
        password: password.value, 
        weight: weight.value, 
        height: height.value, 
        age: age.value, 
        sex: this.state.sex,
        bmrOrig: bmrOrig,
        bmrUpdate: bmrUpdate,
        goals: this.state.goals,
        restrictions: this.state.restrictions,
        activityLevel: this.state.activity,
        exclude: exclude.value,
      }
    }).done( user => {
      // updates the store and react updates the UI with the new data
      dispatch(refreshLogin(user));
      router.push("dashboard");
      dispatch(setFlash('you updated your preferences', 'success'));
    }).fail(err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
    
  }

  numGoals = (goals) => {
    switch (goals) {
      case "lose":
        return -300;
        break;
      case "gain":
        return 300;
        break;
      default:
        return 0;
    }
  }

  numActivity = (activity) => {
    switch (activity) {
      case 'low':
        return 600;
        break;
      case 'medium':
        return 800;
        break;
      case 'high':
        return 1000;
        break;
      default:
        return 0;
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <h2 className="center">Settings</h2>
          <form onSubmit={this.handleSubmit}>
          <h4>Your goals</h4>
            <input type="radio" value="lose" required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='lose'/>
              <label className={someStyle} htmlFor='lose'>Lose Weight</label>
            <input type="radio" value="gain"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='gain' />
              <label htmlFor='gain'>Gain Weight</label>
            <input type="radio" value="maintain" onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='maintain'/>
              <label htmlFor='maintain'>Maintain Weight</label>
            <input type="radio" value="othergoal" onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='othergoal' />
              <label htmlFor='othergoal'>Other</label>
            <h5>Your activity level</h5>
            <input type="radio" value="low" onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='low'/>
              <label htmlFor='low'>Low Activity</label>
            <input type="radio" value="medium" onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='medium' />
              <label htmlFor='medium'>Medium Activity</label>
            <input type="radio" value="high" onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='high'/>
              <label htmlFor='high'>High Activity</label>
            <input type="radio" value="otheractivity" onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='otheractivity' />
              <label htmlFor='otheractivity'>Other</label>
            <h5>Your dietary restrictions</h5>
            <input type="radio" value="vegetarian" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegetarian'/>
              <label htmlFor='vegetarian'>Vegetarian</label>
            <input type="radio" value="vegan" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegan' />
              <label htmlFor='vegan'>Vegan</label>
            <input type="radio" value="nogluten" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nogluten'/>
              <label htmlFor='nogluten'>Gluten Free</label>
            <input type="radio" value="nodairy" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nodairy' />
              <label htmlFor='nodairy'>Dairy Free</label>
            <input type="radio" value="norestrictions" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='norestrictions' />
              <label htmlFor='norestrictions'>None</label>
            <hr/>
            <h5>Food You Hate</h5>
            <input type="text" ref={ n => this.exclude = n } placeholder={this.props.user.exclude}/>
              <br/>
           <button className="btn center">{this.props.route.title}</button>
         </form>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Diet);