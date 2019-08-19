import React, { getGlobal } from 'reactn';
import { Modal } from 'react-materialize';
import InfoModal from './InfoModal';

function UpgradeModal() {
  let devId;
  const userSession = getGlobal().userSession;
  if(userSession.isUserSignedIn()) {
    devId = userSession.loadUserData().username;
  }
  
  return (
    <Modal className="black-text" header="Upgrade Account" trigger={<button id="upgradeButton" className="btn btn-primary">Upgrade</button>}>
      <h5>$9 per month (USD)</h5>
      <p>Features:</p>
      <ul>
        <li>Up to 5 Projects</li>
        <li>Unlimited Modules</li>
        <li>5gb Pinned IPFS Storage via Pinata</li>
        <li>Email Support</li>
        <li>1,000 active users
          <span>
            <InfoModal type="userInfo" />
          </span>
        </li>
      </ul>
      <button id="checkout-button-DeveloperMonthly9" className="btn-primary btn" onClick={() => window.stripeCheckout(devId)}>Purchase</button>
      <p>Need more? <a href="https://simpleid.xyz" target="_blank" rel="noreferrer noopener">Contact us</a> to learn about our Enterprise packages.</p>
    </Modal>
  );
}

export default UpgradeModal;
