import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';


class Dashboard extends React.Component {
// need to be able to pull this information from user via database
// need to be able to update daily caloric intake based on activity level and goals


  render() {
    
    let { weight, height, age } = this.props.user;
    let bmr = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age)
    return(
    <div>
      <h5>Daily Caloric: {parseInt(bmr)}</h5>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);