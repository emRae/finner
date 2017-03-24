import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';

class Meals extends React.Component {
  componentDidMount() {
    var diet = 'vegan'
    var exclude = 'olives'
    var Calories = '2000'
  
    $.ajax({
      type: 'GET',
      headers: {
          'X-Mashape-Key': 'MGqUlSz03Qmsho5Iu4oewmO0fgXdp1DllUYjsnURxaG8cbLwvN'
      },
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=' + diet + '&exclude=' + exclude + '&targetCalories' + Calories,
      success: function(data){
          console.log(data);
      }
    });
  }

  state = { sex: '' }
  
  setSexMale = () => {
    let sex = 'male'
    this.setState({sex})
    console.log(sex)
  }

  setSexFemale = () =>{
    let sex = 'female'
    this.setState({sex})
    console.log(sex)
  }

  handleSumit = () => {
    e.preventDefault();
    let sex = this.sex;
    console.log(sex);
  }

  render() {
    return(
      <div>
          <h2 className="center">{this.props.route.title}</h2>
            <form onSubmit={this.handleSubmit}>
              <p>
              <input type="radio" required={true} name='sex' ref={n => this.sex =n } id='male' onClick={this.setSexMale}/>
                <label htmlFor='male'>Male</label>
              </p>
              <p>
              <input type="radio" required={true} name='sex' ref={n => this.sex =n } id='female' onClick={this.setSexFemale}/>
                <label htmlFor='female'>Female</label>
              </p>
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