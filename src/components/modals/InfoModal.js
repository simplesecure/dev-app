import React from 'reactn';
import { Modal } from 'react-materialize';

function InfoModal(props) {
  if(props.type === "userInfo") {
    return (
      <Modal className="black-text" header="What are counted as users?" trigger={<i style={{cursor: "pointer"}} className="tiny material-icons">info</i>}>
        <p>SimpleID defines a user as a unique account registered through your application. SimpleID user accounts are portable and can be used in other applications if developers enable the functionality. So it is possible that your app will have more users that users counted by SimpleID. It's also possible that this number will match exactly.</p>
        <p>Simply put, if a user created an account through your app, that is counted as a user.</p>
      </Modal>
    );
  } else {
    return (
      <Modal className="black-text" header="Additional Information" trigger={<i style={{cursor: "pointer"}} className="tiny material-icons">info</i>}>
        <p>General Purpose Info</p>
      </Modal>
    )
  }
}

export default InfoModal;