import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm'
import "./CreateSpotForm.css"
import "./BecomeHostButton.css"

function CreateSpotButton() {

  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button id="become-host-button" onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal className='create-spot-modal' onClose={() => setShowModal(false)}>
          <CreateSpotForm hideModal={hideModal}/>
        </Modal>
      )}
    </>
  )
}

export default CreateSpotButton;
