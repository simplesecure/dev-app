import React from 'reactn';
import { Link } from 'react-router-dom';
import logo from '../assets/img/simpleid_black_logo.png';
import { openSideNav } from '../actions/nav';

export default class NavBar extends React.Component {
  render() {
    const { isSignedIn, paidAccount } = this.global;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="brand-logo center"><img className="nav-logo" src={logo} alt="simpleid logo" /></Link>
          <ul id="nav-not-mobile" className="left">
            <li><button onClick={openSideNav} className="link-button"><i className="black-text material-icons">menu</i></button></li>
          </ul>
          <ul id="nav-mobile" className="right">
            {
              isSignedIn && !paidAccount ? 
              <li><button className="btn btn-primary">Upgrade</button></li> : 
              <li className="hide"></li>
            }
            {
              isSignedIn ? 
              <li><button className="link-button">Sign Out</button></li> : 
              <li><button className="link-button">Sign In</button></li>
            }
          </ul>
        </div>
      </nav>  
    );
  }
}