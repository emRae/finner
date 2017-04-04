 import React from 'react';
 import {connect} from 'react-redux';
 import parallaxbg from '../images/fit-fitness.jpg';

class Home extends React.Component{
 render(){
     return(
        <div>
                <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                <div className="container">
                        <br/><br/>
                        <h1 className="header center white-text">WELCOME TO FINNER</h1>
                        <div className="row center">
                        <h5 className="header col s12 light">A health and wellness application to help you keep track of calories and suggest meals that fit within your diet and personal preferences.</h5>
                        </div>
                </div>
                </div>
                <div className="parallax"><img src={parallaxbg} alt="Unsplashed background img 1" /></div>
                </div>
                <h4 className= 'center'> How does it work? </h4>
                    <p className= 'center'> When you sign up we'll ask you a few basic questions about you to determine your BMR.</p>
                    <p className= 'center'> Then we use that information to find your recommended daily caloric intake. From there</p>
                    <p className= 'center'> we're able to take all of that information and generate a meal plan for you </p>
                    <p className= 'center'> that fits within your dietary needs and personal preferences. </p>
        </div>
     );    
    }
}

export default (Home)