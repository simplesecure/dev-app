import React, { setGlobal, getGlobal } from 'reactn';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import logo from '../assets/img/simpleid_white_logo.png';
const defaultAva = "https://i.imgur.com/Le563nU.png";

class SideNav extends React.Component {
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    setGlobal({instance: M.Sidenav.getInstance(this.sidenav)})
  }

  closeSideNav = () => {
    const { instance } = getGlobal();
    instance.close();
  }

  render() {
    const { userSession } = this.global;
    const userAvatar = defaultAva//userSession ? userSession.loadUserData() ? userSession.loadUserData().simpleIdAva ? userSession.loadUserData().simpleIdAva : defaultAva : defaultAva : defaultAva;
    return (
      <div>
        <ul ref={ (sidenav) => {this.sidenav = sidenav} } id="slide-out" className="sidenav">
          <li><div className="user-view">
            <a href="#user"><img className="circle" src={userAvatar} alt="profile avatar" /></a>
            <a href="#name"><span className="accent-text name">{userSession.username}</span></a>
            <a href="#email"><span className="accent-text company">{userSession.companyName}</span></a>
          </div></li>
          <li><Link onClick={this.closeSideNav} to={'/account'}>Account</Link></li>
          <li><Link onClick={this.closeSideNav} to={'/modules'}>Modules</Link></li>
          <li><a href="https://docs.simpleid.xyz" target="_blank" rel="noreferrer noopener">Docs</a></li>
          <li><Link onClick={this.closeSideNav} to={'/stats'}>Stats</Link></li>
          <li>
            <footer className="page-footer">
              <div className="container">
                <div style={{paddingRight: "8px"}} className="row">
                  <div className="col s12 center">
                    <img className="sidebar-logo" src={logo} alt="simpleid logo" />
                  </div>
                  <div className="col s4 center">
                    <a href="https://simpleid.xyz">About</a>
                  </div>
                  <div className="col s4 center">
                    <a href="https://simpleid.xyz">Help</a>
                  </div>
                  <div className="col s4 center">
                    <a href="https://simpleid.xyz">Contact</a>
                  </div>
                </div>
              </div>
            </footer>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNav;