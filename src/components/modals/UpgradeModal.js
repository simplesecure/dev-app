import React from 'reactn';
import { Modal } from 'react-materialize';
import InfoModal from './InfoModal';

function UpgradeModal() {
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
      <p>Need more? <a href="https://simpleid.xyz" target="_blank" rel="noreferrer noopener">Contact us</a> to learn about our Enterprise packages.</p>
      <button className="btn-primary btn">Sign Up Now</button>
    </Modal>
  );
}

export default UpgradeModal;