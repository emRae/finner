import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';

class MealPlanner extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    let {diet, exclude, targetCalories, props: {location, dispatch, router}} = this;

    $.ajax({
    type: 'GET',
    headers: {
        'X-Mashape-Key': 'nP6VWgqTHxmshBXx1YQWWI9WHzSJp1ADIYOjsndhN7Zw2hjyAS'
    },
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=' + diet + '&exclude=' + exclude + '&targetCalories=' + targetCalories,
}).done( user => {
      dispatch(refreshLogin(user));
      router.push("/")
      console.log(data)
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
  }

render() {
    return (
        <div>
            <h2 className="center"> Meal Plan Test Tool </h2>
            <form onSubmit={this.handleSubmit}>
                <input type="string" ref={ n => this.diet = n } placeholder="Diet Type" />
                <input type="string" ref={ n => this.exclude = n } placeholder="Exclude"/>
                <input type="number" ref={ n => this.targetCalories = n} placeholder="Target Calories" />
            </form>
        </div>
    )
}

}

export default connect() (MealPlan);