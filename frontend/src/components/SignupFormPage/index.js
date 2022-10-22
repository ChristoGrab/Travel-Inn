import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm.js';

import "./SignupForm.css"

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
      id="signup-button" 
      onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
