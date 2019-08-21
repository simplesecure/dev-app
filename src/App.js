import React, { setGlobal } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import { getUpdatedConfig } from './actions/account';
import Home from './containers/Home';
import Stats from './components/Stats';
import Modules from './components/Modules';
import Account from './components/Account';
import SideNav from './components/SideNav';
import NavBar from './components/NavBar';
import Verify from './components/Verify';
import './App.css';

import queryString from 'query-string'
import amplitude from "amplitude-js";
import { AmplitudeProvider, LogOnMount, } from "@amplitude/react-amplitude";

const AMPLITUDE_KEY = (process.env.NODE_ENV === 'development') ?
  process.env.REACT_APP_AMPLITUDE_DEVELOPMENT_API :
  process.env.REACT_APP_AMPLITUDE_PRODUCTION_API


class App extends React.Component {
  constructor() {
    super()

    this.queryParams = {}
    try {
      const parsed = queryString.parse(window.location.search)
      if (parsed && parsed.t) {
        this.queryParams['tCode'] = parsed.t
      }
    } catch (suppressedError) {
      console.log(`App:ctor:suppressedError = ${suppressedError}`)
    }
  }

  componentDidMount() {
    const { userSession, modules } = this.global;
    if(userSession.isUserSignedIn()) {
      //Need to check for devConfig updates on each page load:
      getUpdatedConfig();

      if(userSession.loadUserData().devConfig.isVerified) {
        setGlobal({ isUpgraded: userSession.loadUserData().devConfig.isUpgraded });
        if(userSession.loadUserData().devConfig.projects) {
          const storageModules = userSession.loadUserData().devConfig.storageModules || [];
          const authModules = userSession.loadUserData().devConfig.authModules || [];
          modules.auth = authModules;
          modules.storage = storageModules;
          setGlobal({ isVerified: true, projects: userSession.loadUserData().devConfig.projects, modules });
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
        <AmplitudeProvider
          amplitudeInstance={amplitude.getInstance()}
          apiKey={AMPLITUDE_KEY}>
          <LogOnMount
            eventProperties={this.queryParams}
            eventType="SimpleId Loaded" />
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
        </AmplitudeProvider>
      </div>
    );
  }
}

export default App;
