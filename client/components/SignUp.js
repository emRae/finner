import React from 'react';
import { connect } from 'react-redux';
import { refreshLogin, sendData } from '../actions/auth';
import { setFlash } from '../actions/flash';

class SignUp extends React.Component {
  state = { sex: '', bmr: 0}
  
  handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, weight, height, age, sex, props: { location, dispatch, router }} = this;
    let bmr = this.calculateBmr(weight.value, height.value, age.value);

    $.ajax({
      url: `/api/auth${location.pathname}`,
      type: 'POST',
      data: { email: email.value, 
        password: password.value, 
        weight: weight.value, 
        height: height.value, 
        age: age.value, 
        sex: this.state.sex,
        bmr: bmr,
      }
    }).done( user => {
      dispatch(refreshLogin(user));
      router.push("/dashboard")
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
  }

  calculateBmr = (weight, height, age) => {
    if (this.state.sex === 'male') {
      return 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age)
    } else {
      return 655.1 + ( 4.35 * weight) + ( 4.7 * height ) - ( 4.7 * age )
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <h2 className="center">{this.props.route.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="email" required={true} ref={ n => this.email = n } placeholder="Email" />
            <input type="password" required={true} ref={n => this.password = n } placeholder="Password" />
            <input type="number" required={true} ref={n => this.weight =n } placeholder='Weight (lbs)'/>
            <input type="number" required={true} ref={n => this.height =n } placeholder='Height (inches)'/>
            <input type="number" required={true} ref={n => this.age =n } placeholder='Age'/>
            <p>
            <input type="radio" required={true} onChange={this.handleChange} value="male" name='sex' ref={n => this.sex =n } id='male'/>
              <label htmlFor='male'>Male</label>
            </p>
            <p>
            <input type="radio" required={true} name='sex' onChange={this.handleChange} value="female" ref={n => this.sex =n } id='female' />
              <label htmlFor='female'>Female</label>
            </p>
              <br/>
           <button className="btn center">{this.props.route.title}</button>
         </form>
      </div>
    )
  }
}

export default connect()(SignUp);
