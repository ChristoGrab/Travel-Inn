import { useHistory } from 'react-router-dom'

function CreateSpotButton() {
  
  const history = useHistory()

  const displaySpotForm = (e) => {
    e.preventDefault();

    history.push('/create')
  }

  return (
    <button id="create-spot-button" 
    onClick={displaySpotForm}>
      Become a Host
    </button>
  )
}

export default CreateSpotButton;
