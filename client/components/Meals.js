import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';
import Meal from './Meal';

class Meals extends React.Component {

    //     $.ajax({
    //       type: 'POST',
    //       url: '/api/auth/meals',
    //       data: {
    //         diet,
    //         exclusion: 'shellfish',
    //         bmr
    //       }
    //     }).done( meals => {
    //       this.setState({ meals })
    //       let meal = JSON.parse(meals.items[0].value)
    //       console.log(meal.title);
    //     }).fail(err => {
    //       this.props.dispatch(setFlash(err, 'error'))
    //     });
    // }

  handleSubmit = () => {
    let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
      // this.setState({...this.props.user});
      let diet = this.props.user.restrictions
      let exclusion = this.props.user.exclude
      let bmr = this.props.user.bmrUpdate

      $.ajax({
        type: 'GET',
        headers: {
            'X-Mashape-Key': 'nP6VWgqTHxmshBXx1YQWWI9WHzSJp1ADIYOjsndhN7Zw2hjyAS'
        },
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&instructionsRequired=false&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course',
        success: function(data){
            console.log(data);
        }
      });

    // let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
    // // this.setState({...this.props.user});
    // let diet = this.props.user.restrictions
    // let exclusion = this.props.user.exclude
    // let bmr = this.props.user.bmrUpdate

    //   $.ajax({
    //     type: 'POST',
    //     url: '/api/auth/meals',
    //     data: {
    //       diet,
    //       exclusion: 'shellfish',
    //       bmr
    //     }
    //   }).done( meals => {
    //     this.setState({ meals })
    //     let meal = JSON.parse(meals.items[0].value)
    //     return(
    //       <Meal />
    //     )
    //     console.log(meal.title);
    //   }).fail(err => {
    //     this.props.dispatch(setFlash(err, 'error'))
    //   });
  }

  render() {

    return(
      <div>
          <h2 className="center">Your {this.props.route.title} for Today Are:</h2>
            <form>
              <p></p>
                <br/>
            </form>
            <button className="btn center" onClick={this.handleSubmit}>Meals</button>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Meals);