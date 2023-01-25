import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [credendtialFieldIsActive, setCredentialFielsIsActive] = useState(false)
  const [password, setPassword] = useState("");
  const [passwordFieldIsActive, setPasswordFieldIsActive] = useState(false)
  const [errors, setErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const handleCredentialFocus = (text) => {
    setCredential(text)
    if (text !== "") {
      setCredentialFielsIsActive(true)
    } else {
      setCredentialFielsIsActive(false)
    }
  }
  
  function handlePasswordFocus(text) {
    setPassword(text)
    if (text !== "") {
      setPasswordFieldIsActive(true)
    } else {
      setPasswordFieldIsActive(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)

    setErrors([]);

    dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      }
      );
  };

  return (
    <form className='login-form'
      onSubmit={handleSubmit}>
      <div className="auth-form-header">
        Log In
      </div>
      
      <h2>Welcome to Travel-Inn</h2>
      {formSubmitted && errors && (
        <li id="login-error">{errors}</li>
      )}

      <div className="auth-form-body">
        <div className="input-container">

          <input
            className='auth-form-input-top'
            type="text"
            value={credential}
            onChange={(e) => handleCredentialFocus(e.target.value)}
          />
          
          <label className={credendtialFieldIsActive ? 'filled' : "not-filled"}>Username or Email</label>
        </div>

        <div className="input-container">
          <input
            className='auth-form-input-bottom'
            type="password"
            value={password}
            onChange={(e) => handlePasswordFocus(e.target.value)}
          />
          <label className={passwordFieldIsActive ? 'filled' : "not-filled"} htmlFor="password">Password</label>
        </div>
      </div>
      <button className="submit-button" type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
