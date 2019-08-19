import React from 'reactn';
import authProviders from '../data/authModules.json';
import storageProviders from '../data/storageModules.json';
import { Modal } from 'react-materialize';
import { addModule, saveModules } from '../actions/modules';

class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSelection: "auth"
    }
  }
  upgradeModal = () => {
    document.getElementById('upgradeButton').click();
  }

  renderModuleSelector() {
    const { modules, isUpgraded } = this.global;
    const { moduleSelection } = this.state;
    if(moduleSelection === "auth") {
      return (
      <div>
        <div>
          <h5>Choose Your Authentication Providers</h5>
          <div className="row">
            {
              authProviders.map(provider => {
                const header = `${provider.name} Module Info`
                return (
                  <div onClick={provider.id !== "blockstack" ? isUpgraded !== true ? this.upgradeModal : () => addModule('auth', provider.id) : () => addModule('auth', provider.id)} style={{cursor: "pointer"}} key={provider.id} className="col s12 m6 l6">
                    <div className={provider.id !== "blockstack" ? isUpgraded !== true ? "card-panel module-card grey small black-text" : "card-panel module-card small black-text" : "card-panel module-card small black-text"}>
                      <Modal className="black-text" header={header} trigger={
                        <span className="module-info"><i className="material-icons">info</i></span>
                        }>
                        <p>{provider.info}</p>
                      </Modal>
                      <div>
                        <div className="row">
                          <div className="col s6">
                            <img className="module-logo" src={provider.logo} alt={`${provider.name} logo`} />
                          </div>
                          <div className="col s6">
                            <h6 className="module-name">{provider.name}</h6>
                            {
                              provider.id !== "blockstack" ? isUpgraded !== true ? 
                              <span style={{fontSize: "12px", marginTop: "20px"}}>Upgrade to use this module</span> : 
                              <div /> : <div />
                            }
                          </div>
                        </div>
                      </div>
                      {
                        modules.auth.indexOf(provider.id) > -1 ? 
                        <i className="green-text material-icons module-check">check_circle</i>:
                        <div />
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      )
    } else {
      return (
        <div>
          <h5>Choose Your Stroage Providers</h5>
          <div className="row">
            {
              storageProviders.map(prov => {
                const header = `${prov.name} Module Info`
                return (
                  <div onClick={prov.id !== "blockstack" ? isUpgraded !== true ? this.upgradeModal : () => addModule('storage', prov.id) : () => addModule('storage', prov.id)} style={{cursor: "pointer"}} key={prov.id} className="col s12 m6 l6">
                    <div className={prov.id !== "blockstack" ? isUpgraded !== true ? "card-panel module-card grey small black-text" : "card-panel module-card small black-text" : "card-panel module-card small black-text"}>
                      <Modal className="black-text" header={header} trigger={
                        <span className="module-info"><i className="material-icons">info</i></span>
                        }>
                        <p>{prov.info}</p>
                      </Modal>
                      <div>
                        <div className="row">
                          <div className="col s6">
                            <img className="module-logo" src={prov.logo} alt={`${prov.name} logo`} />
                          </div>
                          <div className="col s6">
                            <h6 className="module-name">{prov.name}</h6>
                            {
                              prov.id !== "blockstack" ? isUpgraded !== true ? 
                              <span style={{fontSize: "12px", marginTop: "20px"}}>Upgrade to use this module</span> : 
                              <div /> : <div />
                            }
                          </div>
                        </div>
                      </div>
                      {
                        modules.storage.indexOf(prov.id) > -1 ? 
                        <i className="green-text material-icons module-check">check_circle</i>:
                        <div />
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  render() {
    const { moduleSelection } = this.state;
    const { moduleChanges } = this.global;
    return (
      <div className="page-margin">
        <div className="container">
          <div style={{marginBottom: "50px"}}>
            <h4>Modules</h4>
            <p style={{marginBottom: "60px"}}>You can select a combination of authentication and storage modules. You are restricted by your plan, so if you hit a limit and need more, please upgrade.</p>
            <div className="center">
              <button onClick={() => this.setState({ moduleSelection: "auth" })} style={{marginRight: "25px", fontSize: "18px"}} className={moduleSelection === "auth" ? "btn black white-text" : "btn white black-text"}>Authentication Modules</button><button onClick={() => this.setState({ moduleSelection: "storage" })} style={{fontSize: "18px"}} className={moduleSelection === "auth" ? "btn white black-text" : "btn black white-text"}>Storage Modules</button>
            </div>
          </div>
          {this.renderModuleSelector()}
        </div>

        {
          moduleChanges ? 
          <div className="fixed-action-btn">
            <button onClick={saveModules} className="btn white-text btn-large black">
              Save
            </button>
          </div> : 
          <div />
        }
      </div>
    );
  }
}

export default Modules;