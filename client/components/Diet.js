import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin} from '../actions/auth';
import {setFlash} from '../actions/flash';

class Diet extends React.Component{
  handleSubmit= (e) => {
    e.preventDefault();
    let {goals, activity, restrictions, props: {location, dispatch, router}} = this;
    
    $.ajax({
      url:`/api/auth/${location.pathname}`,
      type: 'POST',
      data: { 
        goals: goals.value,
        activity: activity.value
      }
    }).done( user => {
      dispatch(refreshLogin(user));
      router.push('/')
    }).fail(err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
  }

  render() {
    return (
      <div>
          <h2 className='center'>Tell Us {this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
          <h4>Your goals</h4>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='lose'/>
              <label htmlFor='lose'>Lose Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='gain' />
              <label htmlFor='gain'>Gain Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='maintain'/>
              <label htmlFor='maintain'>Maintain Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='other' />
              <label htmlFor='other'>Other</label>
          <h4>Your dietary restrictions</h4>
            <input type="radio" required={true} name='restrictions' ref={n => this.restrictions =n } id='vegetarian'/>
              <label htmlFor='vegetarian'>Vegetarian</label>
            <input type="radio" required={true} name='restrictions' ref={n => this.restrictions =n } id='vegan' />
              <label htmlFor='vegan'>Vegan</label>
            <input type="radio" required={true} name='restrictions' ref={n => this.restrictions =n } id='nogluten'/>
              <label htmlFor='nogluten'>Gluten Free</label>
            <input type="radio" required={true} name='restrictions' ref={n => this.restrictions =n } id='nodairy' />
              <label htmlFor='nodairy'>Dairy Free</label>
            <input type="radio" required={true} name='restrictions' ref={n => this.restrictions =n } id='none' />
              <label htmlFor='none'>None</label>
          <h4>Your activity level</h4>
            <input type="radio" required={true} name='activity' ref={n => this.activity =n } id='low'/>
              <label htmlFor='low'>Low Activity</label>
            <input type="radio" required={true} name='activity' ref={n => this.activity =n } id='medium' />
              <label htmlFor='medium'>Medium Activity</label>
            <input type="radio" required={true} name='activity' ref={n => this.activity =n } id='high'/>
              <label htmlFor='high'>High Activity</label>
            <input type="radio" required={true} name='activity' ref={n => this.activity =n } id='other2' />
              <label htmlFor='other2'>Other</label>
          </form>
      </div>
    )
  }

  
}

export default connect()(Diet);