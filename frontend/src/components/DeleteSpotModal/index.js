import { Modal } from '../../context/Modal'

function DeleteSpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteModal />
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotModal;
