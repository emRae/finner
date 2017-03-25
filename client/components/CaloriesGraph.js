import React from 'react';
import {connect} from 'react-redux';

class CaloriesGraph extends React.Component {

  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions, bmr, bmrUpdate } = this.props.user;
    // need to have total calories consumed
    // calorie budget - bmr
    // display calories remaining

    console.log(bmr);


    return(
    <div className="calorie-counter">
      <div className="row">
        <div className="col m12 l7">
          <div className="calories-consumed">
            <p><span className="cal-eaten-num num-large">500</span><span className="cal-eaten-text">Calories Consumed Today</span></p>
            <div className="cal-eaten-bar"></div>
            <p>Budget <span className="cal-bmr">1200</span></p>
          </div>
        </div>
        <div className="col m12 l5">
          <div className="cal-left">
            <p className="cal-left-num num-large">700</p>
            <p>Calories <br/>Left</p>
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