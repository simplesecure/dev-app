import React from 'reactn';
import { Modal } from 'react-materialize';

function UpgradeModal() {

  return (
    <Modal className="black-text" header="Upgrade Account" trigger={<button className="btn btn-primary">Upgrade</button>}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    </Modal>
  );
}

export default UpgradeModal;