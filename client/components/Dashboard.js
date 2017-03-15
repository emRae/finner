import React from 'react';
import {connect} from 'react-redux';
import {clearFlash} from '../actions/flash.js'

//BMR
const Dashboard = () => {
let age = 26;
let height = 69;
let weight = 184;
let gender = true;
let bmr = age + height + weight
  if(gender === true) {
    return(
      <div>
        <h1>{this.bmr}</h1>
      </div>
    )
  }
}

//Meals
// 


export default connect()(DashBoard);