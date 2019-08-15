import React, { setGlobal } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home';
import Stats from './components/Stats';
import Modules from './components/Modules';
import Account from './components/Account';
import SideNav from './components/SideNav';
import NavBar from './components/NavBar';
import Verify from './components/Verify';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    const { userSession } = this.global;
    if(userSession.isUserSignedIn()) {
      if(userSession.loadUserData().devConfig.isVerified) {
        if(userSession.loadUserData().devConfig.projects) {
          setGlobal({ isVerified: true, projects: userSession.loadUserData().devConfig.projects });
        } else {
          setGlobal({ isVerified: true });
        }
        
      }
    }
  }
  render() {
    const { isSignedIn } = this.global;
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavBar />
            {
              isSignedIn ? 
              <SideNav />
              : 
              <div />
            }
            <Route exact path='/' component={Home} />
            <Route exact path='/modules' component={isSignedIn ? Modules : Home} />
            <Route exact path='/account' component={isSignedIn ? Account : Home} />
            <Route exact path='/stats' component={isSignedIn ? Stats : Home} />
            <Route exact path='/verify/:id' component={isSignedIn ? Verify : Home} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
