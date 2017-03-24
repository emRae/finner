import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin, setUser} from '../actions/auth';
import {setFlash} from '../actions/flash';
import {store} from '../store.js';
import { someStyle, greatStyle } from './styles.scss';

class Diet extends React.Component{
  
  handleSubmit= (e) => {
    e.preventDefault();
    let {goals, activity, restrictions, props: {location, dispatch, router}} = this;
    
    $.ajax({
      url:`/api/auth/about-diet`,
      type: 'PUT',
      data: { 
        goals: this.state.goals,
        restrictions: this.state.restrictions,
        activityLevel: this.state.activity,
        userId: this.props.user._id
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

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container">
          <h2 className='center'>Tell Us {this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
          <h4>Your goals</h4>
            <input type="radio" value="lose" required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='lose'/>
              <label className={someStyle} htmlFor='lose'>Lose Weight</label>
            <input type="radio" value="gain"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='gain' />
              <label htmlFor='gain'>Gain Weight</label>
            <input type="radio" value="maintain"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='maintain'/>
              <label htmlFor='maintain'>Maintain Weight</label>
            <input type="radio" value="othergoal"required={true} onChange={this.handleChange} name='goals' ref={n => this.goals =n } id='othergoal' />
              <label htmlFor='othergoal'>Other</label>
          <h4>Your activity level</h4>
            <input type="radio" value="low" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='low'/>
              <label htmlFor='low'>Low Activity</label>
            <input type="radio" value="medium" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='medium' />
              <label htmlFor='medium'>Medium Activity</label>
            <input type="radio" value="high" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='high'/>
              <label htmlFor='high'>High Activity</label>
            <input type="radio" value="otheractivity" required={true} onChange={this.handleChange} name='activity' ref={n => this.activity =n } id='otheractivity' />
              <label htmlFor='otheractivity'>Other</label>
          <h4>Your dietary restrictions</h4>
            <input type="radio" value="vegetarian" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegetarian'/>
              <label htmlFor='vegetarian'>Vegetarian</label>
            <input type="radio" value="vegan" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegan' />
              <label htmlFor='vegan'>Vegan</label>
            <input type="radio" value="nogluten" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nogluten'/>
              <label htmlFor='nogluten'>Gluten Free</label>
            <input type="radio" value="nodairy" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nodairy' />
              <label htmlFor='nodairy'>Dairy Free</label>
            <input type="radio" value="norestrictions" required={true} onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='norestrictions' />
              <label htmlFor='norestrictions'>None</label>
            <hr/>
            <button className="btn center">Submit</button>
          </form>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Diet);