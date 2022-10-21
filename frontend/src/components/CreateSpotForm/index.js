import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm'
import "./CreateSpotForm.css"
import "./BecomeHostButton.css"

function CreateSpotButton() {

  const [showModal, setShowModal] = useState(false);

  const history = useHistory()

  const displaySpotForm = (e) => {
    e.preventDefault();

    history.push('/create')
  }

  return (
    <>
      <button id="become-host-button" onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal shouldCloseOnOverlayClick={false} className='create-spot-modal' onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  )
}

export default CreateSpotButton;
