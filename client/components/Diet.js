import React from 'react';
import {connect} from 'react-redux';
import {refreshLogin, setUser} from '../actions/auth';
import {setFlash} from '../actions/flash';
import {store} from '../store.js';
// import { someStyle, greatStyle } from './styles.scss';

class Diet extends React.Component{
  state = { }

  componentDidMount() {
    this.setState({ ...this.props.user }, () => {
      console.log(this.state)
    })
  }

  // comonentWillReceiveProps(nextProps) {
  //   let { goals, restrictions, activityLevel } = this.state;
  //   let { user } = nextProps;
  //   if (goals !== user.goals || restrictions !== user.restrictions || activity !== user.activityLevel)
  //     this.setState(...user)
  // }
  
  handleSubmit= (e) => {
    e.preventDefault();
    let {props: {location, dispatch, router}} = this;
    $.ajax({
      url:`/api/auth/about-diet`,
      type: 'PUT',
      data: { 
        ...this.state
      }
    }).done( user => {
      // updates the store and react updates the UI with the new data
      dispatch(refreshLogin(user));
      router.push("dashboard");
      dispatch(setFlash('you updated your preferences', 'success'));
    }).fail(err => {
      dispatch(setFlash(err.responseJSON.message, 'error'))
    });
    
  }

  numGoals = (goals) => {
    switch (goals) {
      case "lose":
        return -300;
        break;
      case "gain":
        return 300;
        break;
      default:
        return 0;
    }
  }

  numActivity = (activity) => {
    switch (activity) {
      case 'low':
        return 600;
        break;
      case 'medium':
        return 800;
        break;
      case 'high':
        return 1000;
        break;
      default:
        return 0;
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.id })
  }

  renderGoals = () => {
    return [
      { id: 'lose', text: 'Lose Weight' },
      { id: 'gain', text: 'Gain Weight' },
      { id: 'maintain', text: 'Maintain Weight' },
      { id: 'othergoal', text: 'Other' } ].map( radio => {
      let { goals } = this.state;
      let checked = goals === radio.id ? {checked: true} : {}
      return (
        <div>
          <input type="radio" {...checked} key={radio.id} onChange={this.handleChange} name="goals" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }

  renderActivityLevel = () => {
    return [
      { id: 'low', text: 'Low Activity' },
      { id: 'medium', text: 'Medium Activity' },
      { id: 'high', text: 'High Activity' },
      { id: 'otheractivity', text: 'Other' } ].map( radio => {
      let { activityLevel } = this.state;
      let checked = activityLevel === radio.id ? {checked: true} : {}
      return (
        <div>
          <input type="radio" {...checked} key={radio.id} onChange={this.handleChange} name="activity" id={radio.id} />
          <label htmlFor={radio.id}>{radio.text}</label>
        </div>
      )
    });
  }
  

  render() {
    return (
      <div>
        <h2 className="center">Settings</h2>
          <form onSubmit={this.handleSubmit}>
          <h4>Your goals</h4>
          { this.renderGoals() }
          <h5>Your activity level</h5>
          { this.renderActivityLevel() }
          <h5>Your dietary restrictions</h5>

            <input type="radio" value="vegetarian" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegetarian'/>
              <label htmlFor='vegetarian'>Vegetarian</label>
            <input type="radio" value="vegan" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='vegan' />
              <label htmlFor='vegan'>Vegan</label>
            <input type="radio" value="nogluten" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nogluten'/>
              <label htmlFor='nogluten'>Gluten Free</label>
            <input type="radio" value="nodairy" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='nodairy' />
              <label htmlFor='nodairy'>Dairy Free</label>
            <input type="radio" value="norestrictions" onChange={this.handleChange} name='restrictions' ref={n => this.restrictions =n } id='norestrictions' />
              <label htmlFor='norestrictions'>None</label>
            <hr/>
            <h5>Food You Hate</h5>
            <input type="text" ref={ n => this.exclude = n } placeholder={this.props.user.exclude}/>
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

export default connect(mapStateToProps)(Diet);