import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin, setUser} from '../actions/auth';
import {setFlash} from '../actions/flash';
import {store} from '../store.js';
// import { someStyle, greatStyle } from './styles.scss';

class Diet extends React.Component{
  state = { }

  componentDidMount() {
    this.setState({ ...this.props.user }, () => {
      console.log(this.state)
    })
  }
  
  handleSubmit= (e) => {
    e.preventDefault();
    let { weight, height, age, sex, goals, restrictions, activity, props: { location, dispatch, router }} = this;
    let bmr = this.calculateBmr(weight, height, age, activity, goals );
    $.ajax({
      url:`/api/auth/about-diet`,
      type: 'PUT',
      data: { 
        _id: this.props.user._id,
        goals: this.state.goals,
        restrictions: this.state.restrictions,
        activity: this.state.activity,
        bmr: bmr
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

// Men: BMR = 66 + (6.23 x weight in pounds) + (12.7 x height in inches) - (6.8 x age in years)
// Women: BMR = 655 + (4.35 x weight in pounds) + (4.7 x height in inches) - (4.7 x age in years)
// Women: BMR = 655 + (4.35 x 125 ) + (4.7 x 65 ) - (4.7 x 30 ) + -300 + 800 
// Women: BMR = 655 + ( 543.75 ) + ( 305.5 ) - ( 141 ) + -300 + 800 = 1863.25
// Women: BMR = 655 + ( 543.75 ) + ( 305.5 ) - ( 141 ) =  1363.25 (should equal 1363.25)

  calculateBmr = (weight, height, age, activity, goals) => {
    if (this.state.sex === 'male') {
      return 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age) + this.numActivity(activity) + this.numGoals(goals)
    } else {
      return 655 + ( 4.35 * weight) + ( 4.7 * height ) - ( 4.7 * age ) + this.numActivity(activity) + this.numGoals(goals)
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.id })
  }

  renderGoals = () => {
    return [
      { id: 'lose', text: 'Lose Weight' },
      { id: 'gain', text: 'Gain Weight' },
      { id: 'maintain', text: 'Maintain Weight' } ].map( radio => {
      let { goals } = this.state;
      let checked = goals === radio.id ? {checked: true} : {}
      return (
        <div>
          <input type="radio" {...checked} key={radio.id} onChange={this.handleChange} name="goals" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }

  renderActivityLevel = () => {
    return [
      { id: 'low', text: 'Low Activity' },
      { id: 'medium', text: 'Medium Activity' },
      { id: 'high', text: 'High Activity' } ].map( radio => {
      let { activity } = this.state;
      let checked = activity === radio.id ? {checked: true} : {}
      return (
        <div>
          <input type="radio" {...checked} key={radio.id} onChange={this.handleChange} name="activity" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }

  renderRestrictions = () => {
    return [
      { id: 'vegetarian', text: 'Vegetarian' },
      { id: 'vegan', text: 'Vegan' },
      { id: 'nogluten', text: 'Gluten Free' },
      { id: 'nodairy', text: 'Dairy Free' },
      { id: 'norestrictions', text: 'None' } ].map( radio => {
      let { restrictions } = this.state;
      let checked = restrictions === radio.id ? {checked: true} : {}
      return (
        <div>
          <input type="radio" {...checked} key={radio.id} onChange={this.handleChange} name="restrictions" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }
  

  render() {
    return (
      <div>
        <h2 className="center">Settings</h2>
          <form onSubmit={this.handleSubmit}>
          <h5>Your goals</h5>
          { this.renderGoals() }
          <h5>Your activity level</h5>
          { this.renderActivityLevel() }
          <h5>Your dietary restrictions</h5>
          { this.renderRestrictions() }
            <hr/>
              <br/>
           <button className="btn center">Update</button>
         </form>
      </div>
    )
  }

  
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Diet);