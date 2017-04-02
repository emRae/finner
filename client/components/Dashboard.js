import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import CaloriesGraph from './CaloriesGraph';


class Dashboard extends React.Component {

  render() {
    
    let { weight, height, age, goals, activityLevel, restrictions, bmrUpdate } = this.props.user;
    return(
    <div className="container">
      <CaloriesGraph />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard);