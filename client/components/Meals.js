import React from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import unirest from 'unirest';

class Meals extends React.Component {



  handleSubmit = () => {
    // let {email, weight, height, age, sex, goals, restrictions, activityLevel, exclude, bmrOrig, bmrUpdate } = this.props.user;
    // this.setState({...this.props.user});
    let diet = this.props.user.restrictions
    // let exclusion = this.props.user.exclude
    // var bmr = this.props.user.bmrUpdate

    let calculateBmr = () => {
        let {weight, height, age, sex } = this.props.user;
        if ( sex === 'male') {
          return parseInt(66 + (6.2 * weight) + (12.7 * height) - (6.76 * age));
        } else {
          return parseInt(655.1 + ( 4.35 * weight) + ( 4.7 * height ) - ( 4.7 * age ));
        }
    }
    let bmr = calculateBmr();
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
      }).fail(err => {
        this.props.dispatch(setFlash(err, 'error'))
      });
  }

  render() {
    return(
      <div>
          <h2 className="center">Your {this.props.route.title} for Today Are:</h2>
            <form>
              <p>I tried, and only got so far....</p>
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