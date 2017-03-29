import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';
import Meal from './Meal';

class Meals extends React.Component {

  componentDidMount() {
      let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
      // this.setState({...this.props.user});
      let diet = this.props.user.restrictions
      let exclusion = this.props.user.exclude
      let bmr = this.props.user.bmrUpdate

        $.ajax({
          type: 'POST',
          url: '/api/auth/meals',
          data: {
            diet,
            exclusion: 'shellfish',
            bmr
          }
        }).done( meals => {
          this.setState({ meals })
          let meal = JSON.parse(meals.items[0].value)
          console.log(meal.title);
        }).fail(err => {
          this.props.dispatch(setFlash(err, 'error'))
        });
    }

  handleSubmit = () => {
    let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
    // this.setState({...this.props.user});
    let diet = this.props.user.restrictions
    let exclusion = this.props.user.exclude
    let bmr = this.props.user.bmrUpdate

      $.ajax({
        type: 'POST',
        url: '/api/auth/meals',
        data: {
          diet,
          exclusion: 'shellfish',
          bmr
        }
      }).done( meals => {
        this.setState({ meals })
        let meal = JSON.parse(meals.items[0].value)
        return(
          <Meal />
        )
        console.log(meal.title);
      }).fail(err => {
        this.props.dispatch(setFlash(err, 'error'))
      });
  }

  render() {
      /*let meals = this.state.meals.map( bucket => {
        return (
          <Meal 
          key = {meals.items[i].value}
          {...meals}
          />
        )
      });
      console.log(this.state)*/

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