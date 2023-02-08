import { useDispatch } from 'react-redux';
import { useState } from "react";
import { login } from "../../../store/session"
import './DemoUser.css'

function DemoUser() {
  
  const dispatch = useDispatch(); 
  
  const [ loading, setLoading] = useState(false)
  
  const loginDemoUser = (e) => {
    e.preventDefault();
    
    
    
    const credential = "Merquise"
    const password = "password1"
    
    setLoading(true)
    
    dispatch(login({ credential, password }))
  }
  
  return (
    <>
      {!loading ?
        <button className="demo-user"
        onClick={loginDemoUser}>
          Demo Login
        </button>
      : <button className="loading-button" disabled={true}>
        <span className="loading-text-1">. </span>
        <span className="loading-text-2">. </span>
        <span className="loading-text-3">. </span>
        </button>}
    </>
  )
}

export default DemoUser;
