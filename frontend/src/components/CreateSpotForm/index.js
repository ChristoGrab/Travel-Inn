import { useHistory } from "react-router-dom"
import "./CreateSpotForm.css"
import "./BecomeHostButton.css"

function CreateSpotButton() {
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    history.push('/spots/create')
  }

  return (
      <button id="become-host-button" onClick={handleSubmit}>Become a Host</button>
  )
}

export default CreateSpotButton;
