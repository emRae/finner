import React from 'react';
import { Link } from 'react-router';
import { logout, refreshLogin } from '../actions/auth';
import { connect } from 'react-redux';
import Flash from '../components/Flash';


const divStyle = {
  color: '#ffffff',
  backgroundImage: 'url(https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQqGyNL1W2DBFV4MpqBgsAYwtcPKqOMr2iDOFRCrb8wSuDLu9AE)'
}
class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({ closeOnClick: true });
    this.props.dispatch(refreshLogin());
  }

  // links = () => {
  //   return [
  //     { name: 'Home', path: '/' },
  //   ].map( (link, i) => {
  //     return this.link(i, link.name, link.path)
  //   })
  // }

  link = (i, name, path, icon ) => {
    let activeClass = this.props.location.pathname === path ? 'active' : '';
    return (
      <li key={i} className={activeClass}>
        <Link to={path}>{name}</Link>
      </li>
    )
  }

  authLinks = () => {
    if (Object.keys(this.props.user).length) {
       let links = [
         { name: 'Dashboard', path: '/dashboard'},
         { name: 'Settings', path: '/about-diet'},
         { name: 'Meals', path: '/meals'}
        ].map( (link, i) => {
          return this.link(i, link.name, link.path)
        });
        links.push(
            <li key="logout">
              <a 
                href="#" 
                onClick={ e => {
                  this.props.dispatch(logout(this.props.router))
                }}
              >
                Logout
              </a>
            </li>
            
        )
      return links;
    } else {
      return [
        { name: 'Home', path: '/' },
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' },
      ].map( (link, i) => {
        let active = this.props.location.pathname === link.path ? 'active' : '';
        return this.link(i, link.name, link.path)
      })
    }
  }

  render() {
    return (
      <div style={divStyle}>
        <div>
          <nav>
            <div className="nav-wrapper grey darken-4">
              <a href="#!" className="brand-logo">Finner</a>
              <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                { /* this.links() */ }
                { this.authLinks() }
              </ul>
              <ul className="side-nav" id="mobile">
                { /* this.links() */ }
                { this.authLinks() }
              </ul>
            </div>
          </nav>
          <Flash />
          {this.props.children}
        </div>
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
       </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(App);
