import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots';

function DeleteModal() {
  
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // Use parseInt so thunk can interpret Id
  const deleteId = parseInt(spotId)
  
  const confirmDelete = async (e) => {
    e.preventDefault();
    
    dispatch(deleteSpotThunk(deleteId))
    history.push('/')
  }
  
  const abortDelete = (e) => {
    e.preventDefault();
    
    history.push(`/spots/${spotId}`)
  }
  
  return (
    <div>
  <h2>Are you sure you want to delete this listing?</h2>
  <p>Doing so will erase it from our database, and is an irreversable process</p>
  <button
  onClick={confirmDelete}>Yes, I am aware of the consequences</button>
  <button
  onClick={abortDelete}>No thanks, take me back to safety!</button>
  </div>
  )
}

export default DeleteModal;
