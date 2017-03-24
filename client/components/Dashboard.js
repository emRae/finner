import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import CaloriesGraph from './CaloriesGraph';


class Dashboard extends React.Component {

  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions, bmr } = this.props.user;
    return(
    <div>
      <CaloriesGraph />
      <h5>Daily Caloric: {parseInt(bmr)}</h5>
      <p>Your goal is to: {goals}</p>
      <p>Your activity level is: {activityLevel}</p>
      <p>Your diet is based on: {restrictions}</p>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);