import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin} from '../actions/auth';
import {setFlash} from '../actions/flash';

class GoalsForm extends React.Component{
  handleSubmit= (e) => {
    e.preventDefault();
    let {goals, activityLevel, props: {location, dispatch, router}} = this;
    
    $.ajax({
      url:`/api/auth/${location.pathname}`,
      type: 'POST',
      data: { 
        goals: goals.value,
        activityLevel: activityLevel.value
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
          <h2 className='center'>Set Your {this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
          <h4>Set your goals</h4>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='lose'/>
              <label htmlFor='lose'>Lose Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='gain' />
              <label htmlFor='gain'>Gain Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='maintain'/>
              <label htmlFor='maintain'>Maintain Weight</label>
            <input type="radio" required={true} name='goals' ref={n => this.goals =n } id='other' />
              <label htmlFor='other'>Other</label>
          <h4>Set your activity level</h4>
            <input type="radio" required={true} name='activityLevel' ref={n => this.activityLevel =n } id='low'/>
              <label htmlFor='low'>Low Activity</label>
            <input type="radio" required={true} name='activityLevel' ref={n => this.activityLevel =n } id='medium' />
              <label htmlFor='medium'>Medium Activity</label>
            <input type="radio" required={true} name='activityLevel' ref={n => this.activityLevel =n } id='high'/>
              <label htmlFor='high'>High Activity</label>
            <input type="radio" required={true} name='activityLevel' ref={n => this.activityLevel =n } id='other2' />
              <label htmlFor='other2'>Other</label>
          </form>
      </div>
    )
  }

  
}

export default connect()(GoalsForm);