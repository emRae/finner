 import React from 'react';
 import {connect} from 'react-redux';

class Home extends React.Component{
 render(){
     return(
        <div>
                <h1  className= 'center'> Welcome to Finner! </h1>
                        <br/>
                <h4  className= 'center'> What is Finner? </h4>
                     <p  className= 'center'> Finner is a health and wellness application to help you keep track of calories</p>
                     <p  className= 'center'>  and suggest meals that fit within your diet and personal preferences.</p>
                        <br/>
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