import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { UserSession, AppConfig } from 'blockstack';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const appConfig = new AppConfig(['store_write', 'publish_data', 'email']);
const userSession = new UserSession({ appConfig })

setGlobal({
  instance: {},
  isSignedIn: true, 
  userSession,
  screen: "login", 
  moduleChanges: false, 
  projects: [],
  modules: {
    auth: [],
    storage: []
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
