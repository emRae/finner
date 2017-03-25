import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';

class Meals extends React.Component {
  
  componentDidMount() {
    let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
    this.setState({...this.props.user});
    let diet = this.props.user.restrictions
    let exclusion = this.props.user.exclude
    var bmr = this.props.user.bmrUpdate
  
    $.ajax({
      type: 'GET',
      headers: {
          'X-Mashape-Key': 'nP6VWgqTHxmshBXx1YQWWI9WHzSJp1ADIYOjsndhN7Zw2hjyAS'
      },
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=' + diet + '&exclude=' + exclusion + '&targetCalories' + bmr,
      success: function(data){
          console.log(data);
          let test = JSON.parse(data.items[0].value);
          console.log(test.title);

          for (let i = 0; i <= data.items.length; i++) {
            let recipe = JSON.parse(data.items.i)
          }
      }
    });
  }

  render() {
    return(
      <div>
          <h2 className="center">Your {this.props.route.title} for Today Are:</h2>
            <form onSubmit={this.handleSubmit}>
              <p>I tried, and only got so far....</p>
              <p></p>
                <br/>
            <button className="btn center">{this.props.route.title}</button>
          </form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Meals);