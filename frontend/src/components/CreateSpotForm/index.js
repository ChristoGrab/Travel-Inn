import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

function CreateSpotButton() {
  
  const history = useHistory()
  
  const displaySpotForm = (e) => {
    e.preventDefault();
    
    console.log("I am clicked")
    
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
