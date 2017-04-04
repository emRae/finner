import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';
import Meal from './Meal';

class Meals extends React.Component {
  state = {data:{results:[], cuisine: '', query: '', number: '', type:''}}

  handleSubmit = (e) => {
    e.preventDefault();
    let recipe = 'true';
    let cuisine = this.state.cuisine;
    let excludeIngredients = 'peanut';
    let fillIngredients = 'false';
    let includeIngredients = 'beef';
    let instructionsRequired = 'false';
    let intolerances = '';
    let limitLicense = 'false';
    let maxCalories = 500;
    let maxCarbs = 200;
    let maxFat = 100;
    let maxProtein = 100;
    let minCalories = 300;
    let minCarbs = 150;
    let minFat = 100;
    let minProtein = 100;
    let number = this.state.number;
    let offset = 0;
    let query = this.state.query;
    let ranking = 1;
    let type = this.state.type;

      $.ajax({
        type: 'GET',
        headers: {
            'X-Mashape-Key': 'nP6VWgqTHxmshBXx1YQWWI9WHzSJp1ADIYOjsndhN7Zw2hjyAS'
        },
        url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=${recipe}&cuisine=${cuisine}&excludeIngredients=${excludeIngredients}&limitLicense=${limitLicense}&maxCalories=${maxCalories}&maxCarbs=${maxCarbs}&maxFat=${maxFat}&$maxProtein=${maxProtein}&minCalories=${maxCalories}&minCarbs=${maxCarbs}&minFat=${maxFat}&$minProtein=${maxProtein}&number=${number}&offset=${offset}&query=${query}&ranking=${ranking}`,
      }).done(data => {
          console.log("click")
          this.setState({data: {results: data.results}}, () => {
        });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    console.log(this.state.data.results)
    let recipes = this.state.data.results.map( recipe => {
      return(
          <div key={recipe.id}>{recipe.title}</div>
      )
    })
    return(
      <div className="container">
          <h2 className="center">Your {this.props.route.title} for Today Are:</h2>
            <div>{recipes}</div>
            <form onSubmit={this.handleSubmit}>
              <p>What would you like to eat today?</p>
              <input type="text" name='cuisine' onChange={this.handleChange} placeholder="Chinese, American, Ethiopian?" />
              <p>How many choices do you want?</p>
              <input type="number" name='number' onChange={this.handleChange} placeholder="5" />
              <p>What do you want to include?</p>
              <input type="text" required={true} name='query' onChange={this.handleChange} placeholder="Beef, chicken, or pees?" />
              <p>What's this for?</p>
              <input type="radio" value="breakfast" required={true} onChange={this.handleChange} name='type' id='breakfast'/>
                <label htmlFor='breakfast'>Breakfast</label>
              <input type="radio" value="lunch"required={true} onChange={this.handleChange} name='type' id='lunch' />
                <label htmlFor='lunch'>Lunch</label>
              <input type="radio" value="dinner"required={true} onChange={this.handleChange} name='type' id='dinner'/>
                <label htmlFor='dinner'>Dinner</label>
              <input type="radio" value="snack"required={true} onChange={this.handleChange} name='type' id='snack' />
              <label htmlFor='snack'>Snack</label>
              <br/>
              <br/>
            <button className='btn center'>Get My Meal</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Meals);

 


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

      // componentDidMount() {
  //       $.ajax({
  //         type: 'POST',
  //         url: '/api/auth/meals',
  //         data: {
  //           diet,
  //           exclusion: 'shellfish',
  //           bmr
  //         }
  //       }).done( meals => {
  //         this.setState({ meals })
  //         let meal = JSON.parse(meals.items[0].value)
  //         console.log(meal.title);
  //       }).fail(err => {
  //         this.props.dispatch(setFlash(err, 'error'))
  //       });
  //   }