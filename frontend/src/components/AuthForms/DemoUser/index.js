import { useDispatch } from 'react-redux';
import { login } from "../../../store/session"
import './DemoUser.css'

function DemoUser() {
  
  const dispatch = useDispatch(); 
  
  const loginDemoUser = (e) => {
    e.preventDefault();
    
    const credential = "Merquise"
    const password = "password1"
    
    dispatch(login({ credential, password }))
    
  }
  
  return (
    <button id="demo-user" 
    onClick={loginDemoUser}>
      Demo Login
    </button>
  )
}

export default DemoUser;
