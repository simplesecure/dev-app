import React from 'reactn';
import { Link } from 'react-router-dom';
import logo from '../assets/img/simpleid_black_logo.png';
import { openSideNav } from '../actions/nav';
import { handleSignOut } from '../actions/account';
import UpgradeModal from './modals/UpgradeModal';

export default class NavBar extends React.Component {
  render() {
    const { isSignedIn, paidAccount } = this.global;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="brand-logo center"><img className="nav-logo" src={logo} alt="simpleid logo" /></Link>
          <ul id="nav-not-mobile" className="left">
            {
              isSignedIn ? 
              <li><button style={{marginLeft: "10px"}} onClick={openSideNav} className="link-button"><i className="black-text material-icons">menu</i></button></li> : 
              <li className="hide"/>
            }
          </ul>
          <ul id="nav-mobile" className="right">
            {
              isSignedIn && !paidAccount ? 
              <li>
                <UpgradeModal />  
              </li> : 
              <li className="hide"></li>
            }
            {
              isSignedIn ? 
              <li><button style={{marginLeft: "15px", marginRight: "15px"}} onClick={handleSignOut} className="link-button">Sign Out</button></li> : 
              <li className="hide" />
            }
          </ul>
        </div>
      </nav>  
    );
  }
}