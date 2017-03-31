import React from 'react';
import {connect} from 'react-redux';

class CaloriesGraph extends React.Component {

  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions, bmr, } = this.props.user;
    // need to have total calories consumed
    // calorie budget - bmr
    // display calories remaining

    // console.log(bmr);


    return(
    <div className="calorie-graph teal lighten-5">
      <div className="row">
        <div className="col m12 l7">
          <div className="calories-consumed">
            <p><span className="cal-eaten-num num-large">500</span><span className="cal-eaten-text">Calories Consumed Today</span></p>
            <div className="cal-eaten-bar"></div>
            <p>Budget <span className="cal-bmr">{ bmr.toLocaleString('en-US', {maximumFractionDigits: 0}) }</span> Calories</p>
          </div>
        </div>
        <div className="col m12 l5">
          <div className="cal-left">
            <span className="cal-left-num num-large">700</span>
            <p>Calories Left</p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(CaloriesGraph);