import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';


class Dashboard extends React.Component {
// need to be able to pull this information from user via database
// need to be able to update daily caloric intake based on activity level and goals


  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions } = this.props.user;
    let bmr = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age)
    return(
    <div>
      <h5>Daily Caloric: {parseInt(bmr)}</h5>
      <p>Your goal is to: {goals}</p>
      <p>Your activity level is: {activityLevel}</p>
      <p>Your activity level is: {restrictions}</p>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);