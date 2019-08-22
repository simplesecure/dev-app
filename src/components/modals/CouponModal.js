import React from 'reactn';
import { Modal, TextInput } from 'react-materialize';

function CouponModal(props) {
    return (
      <Modal className="black-text" header="Have a coupon code?" trigger={<button style={{cursor: "pointer"}} className="link-button">Have a coupon code?</button>}>
        <p>Enter the code you received below</p>
        <TextInput id="project-name-input" label="Project Name" />
        <button className="black btn">Submit Code</button>
      </Modal>
    );
}

export default CouponModal;